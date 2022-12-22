import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { Employee } from '../employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeserviceService {
  isLoggedIn!:boolean;
  searchData: Subject<any> = new Subject<any>();    
  public userDetailsObs = this.searchData.asObservable();

  allEmployees: Employee[] = [
    {
      "id": "1",
      "name": "valli",
      "position": "intern",
      "about": "2022",
      "joining_date": "2022-12-04"
    }
  ]

  constructor() { }

  addEmployee(employee: Employee){
    this.allEmployees = JSON.parse(localStorage.getItem('data') || '[]')
    this.allEmployees.push(employee);
    console.log(this.allEmployees);
    localStorage.setItem('data', JSON.stringify(this.allEmployees));
  }


  getEmployee(){
    this.allEmployees = JSON.parse(localStorage.getItem('data') || '[]')
    return this.allEmployees;
  }
  
  editEmployee(employee: Employee, id:string){
    console.log(this.allEmployees)
    this.allEmployees.find(emp => {
      let emp_obj: any = employee.joining_date;
      let emp_joining_date = emp_obj.day+"/"+emp_obj.month+"/"+emp_obj.year
      if(emp.id == id){
        emp.name = employee.name;
        emp.about = employee.about;
        emp.position = employee.position
        emp.joining_date = emp_joining_date
      }
      localStorage.setItem('data', JSON.stringify(this.allEmployees));
    });
  }
  
  deleteEmployee(employee:Employee){
    this.allEmployees = this.allEmployees.filter(emp => emp.id != employee.id)
    localStorage.setItem('data', JSON.stringify(this.allEmployees));

  }
}
