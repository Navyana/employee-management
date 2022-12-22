import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { EmployeserviceService } from '../services/employeservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() searchWord = new EventEmitter();
  searchText: any;
  isMenuOpen = false;
  canEdit = false;

  constructor(public employeeService: EmployeserviceService) { }

  ngOnInit(): void { }
  
  search() {
    this.searchWord.emit(this.searchText);
  }

  loggedOut() {
    this.employeeService.isLoggedIn = false;
    console.log(this.employeeService.isLoggedIn)
  }

}
