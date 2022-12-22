import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Employee } from '../employee';
import { Router } from '@angular/router';
import { EmployeserviceService } from '../services/employeservice.service';
import {DatePipe, formatDate} from '@angular/common';



@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employeeDetails !: FormGroup;
  employee!: Employee;
  employeeData: any;
  joiningDate!: string;
  editEmp!:Employee;
  empList:any = []; 
  mybreakpoint: any;
  list: boolean = true;
  grid:boolean = false;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  searchData:any;
  canEdit: boolean = false;
  datetime!: string;
  d: any;

  constructor(private formBuilder: FormBuilder,
              private employeService: EmployeserviceService,
              private router: Router,
              private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.employeService.userDetailsObs.subscribe((searchData) =>{
      this.searchData = searchData;
      
  })
  
    this.mybreakpoint = (window.innerWidth <= 600) ? 1 : 4;

    this.employeeDetails = this.formBuilder.group({
      id:[''],
      name : [''],
      position: [''],
      about: [''],
      joining_date: ['']
    });
    this.getAllEmployees();
  }
  handleSize(event:any) {
    this.mybreakpoint = (event.target.innerWidth <= 600) ? 1 :4;
    // if(event.target.innerWidth <= 400){
    //   this.mybreakpoint = 1;
    // }
    //  if(event.target.innerWidth <=600){
    //   this.mybreakpoint = 2;
    // }else{
    //   this.mybreakpoint = 4;
    // }
  }

  listView(){
    this.grid = false;
    this.list = true
    this.tableSize = 10;
  }
  gridView(){
    this.list = false;
    this.grid = true;
    this.tableSize = 12;
  }

  canEditEmployee(){
    if (this.employeService.isLoggedIn){
      return true;
    }
    return false;
  }

  addEmployee(){
    this.employeeData = this.employeeDetails.value;
    let dateObj = this.employeeData.joining_date;
    let date = dateObj.day+"/"+dateObj.month+"/"+dateObj.year;
    this.employee = new Employee(this.makeRandomID(),this.employeeData.name, this.employeeData.position, this.employeeData.about, date)
    this.employeService.addEmployee(this.employee);
    this.getAllEmployees()
  }

  makeRandomID(): string {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  getAllEmployees(){
    this.empList = this.employeService.getEmployee();
  }

  onSelect(emp:Employee){
    this.editEmp = emp;
    if(this.employeService.isLoggedIn) {
      let date_obj = {"year":0, month:0, day:0}
      let emp_joining_date = emp.joining_date.split("/")
      date_obj.year = parseInt(emp_joining_date[2])
      date_obj.month = parseInt(emp_joining_date[1])
      date_obj.day = parseInt(emp_joining_date[0])
      this.employeeDetails.controls['name'].setValue(emp.name);
      this.employeeDetails.controls['position'].setValue(emp.position);
      this.employeeDetails.controls['about'].setValue(emp.about);
      this.employeeDetails.controls['joining_date'].setValue(date_obj);
      (document.getElementById("edit-close") as HTMLFormElement).click()
    } else {
      this.router.navigateByUrl("/login");
    }
  }
  
  editEmployee(emp : Employee){
    const id = this.editEmp.id;
    this.employeService.editEmployee(emp,id);

  }

  deleteEmployee(emp:Employee){
    console.log(emp)
    this.employeService.deleteEmployee(emp);
    this.getAllEmployees();
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getAllEmployees();
  }
  
}
