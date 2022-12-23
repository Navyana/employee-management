import { Router } from "@angular/router";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { EmployeserviceService } from "../services/employeservice.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  @Output() searchWord = new EventEmitter();
  searchText: any;
  isMenuOpen = false;
  canEdit = false;

  constructor(
    public employeeService: EmployeserviceService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  containsSpecialCharacters(s: any) {
    let regex = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
    return regex.test(s);
  }

  search() {
    if (this.containsSpecialCharacters(this.searchText)) {
      this.router.navigateByUrl("/error");
    } else {
      this.router.navigateByUrl("/");
      this.searchWord.emit(this.searchText);
    }
  }

  loggedOut() {
    this.employeeService.isLoggedIn = false;
  }
}
