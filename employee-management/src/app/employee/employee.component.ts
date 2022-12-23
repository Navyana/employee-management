import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Employee } from "../employee";
import { Router } from "@angular/router";
import { EmployeserviceService } from "../services/employeservice.service";

@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.css"],
})
export class EmployeeComponent implements OnInit {
  employeeDetails!: FormGroup;
  employee!: Employee;
  employeeData: any;
  joiningDate!: string;
  editEmp!: Employee;
  empList: any = [];
  mybreakpoint: any;
  list: boolean = true;
  grid: boolean = false;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  searchData: any;
  canEdit: boolean = false;
  datetime!: string;
  d: any;

  constructor(
    private formBuilder: FormBuilder,
    private employeService: EmployeserviceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.mybreakpoint = 4;
    this.employeService.userDetailsObs.subscribe((searchData) => {
      this.searchData = searchData;
    });
    this.employeeDetails = this.formBuilder.group({
      id: [""],
      name: [""],
      position: [""],
      about: [""],
      joining_date: [""],
    });
    this.getAllEmployees();
  }

  handleSize(event: any) {
    let screenSize = event.target.innerWidth;
    if (screenSize <= 540) {
      this.mybreakpoint = 1;
    } else if (screenSize >= 540 && screenSize <= 1100) {
      this.mybreakpoint = 2;
    } else if (screenSize >= 1100 && screenSize <= 1300) {
      this.mybreakpoint = 3;
    } else {
      this.mybreakpoint = 4;
    }
  }

  listView() {
    this.grid = false;
    this.list = true;
    this.tableSize = 10;
  }
  gridView() {
    this.list = false;
    this.grid = true;
    this.tableSize = 12;
  }

  canEditEmployee() {
    if (this.employeService.isLoggedIn) {
      return true;
    }
    return false;
  }

  specialSearch() {
    this.router.navigateByUrl("/login");
  }

  addEmployee() {
    this.employeeData = this.employeeDetails.value;
    let dateObj = this.employeeData.joining_date;
    let date = dateObj.day + "/" + dateObj.month + "/" + dateObj.year;
    this.employee = new Employee(
      this.makeRandomID(),
      this.employeeData.name,
      this.employeeData.position,
      this.employeeData.about,
      date
    );
    this.employeService.addEmployee(this.employee);
    this.getAllEmployees();
  }

  makeRandomID(): string {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  getAllEmployees() {
    this.empList = this.employeService.getEmployee();
  }

  onSelect(emp: Employee) {
    this.editEmp = emp;
    if (this.employeService.isLoggedIn) {
      let date_obj = { year: 0, month: 0, day: 0 };
      let emp_joining_date = emp.joining_date.split("/");
      date_obj.year = parseInt(emp_joining_date[2]);
      date_obj.month = parseInt(emp_joining_date[1]);
      date_obj.day = parseInt(emp_joining_date[0]);
      this.employeeDetails.controls["name"].setValue(emp.name);
      this.employeeDetails.controls["position"].setValue(emp.position);
      this.employeeDetails.controls["about"].setValue(emp.about);
      this.employeeDetails.controls["joining_date"].setValue(date_obj);
    } else {
      this.router.navigateByUrl("/login");
    }
  }

  editEmployee(emp: Employee) {
    const id = this.editEmp.id;
    this.employeService.editEmployee(emp, id);
  }

  deleteEmployee(emp: Employee) {
    if (this.employeService.isLoggedIn) {
      this.employeService.deleteEmployee(emp);
      this.getAllEmployees();
    } else {
      this.router.navigateByUrl("/login");
    }
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getAllEmployees();
  }
}
