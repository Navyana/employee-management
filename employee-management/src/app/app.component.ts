import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeserviceService } from './services/employeservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'employee-management-system';
  data: any;

  constructor( 
    private employeService: EmployeserviceService) { }

  search(data: any){
    this.employeService.searchData.next(data)
  }
  onActivate(event:any){
    event.data = this.data;
  }
}
