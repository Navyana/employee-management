import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { EmployeserviceService } from "../services/employeservice.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  user: string = "";
  password: string = "";
  loggedIn: boolean = false;

  constructor(
    private employeeService: EmployeserviceService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  loginUSer() {
    if (this.user == "admin" && this.password == "admin") {
      this.employeeService.isLoggedIn = true;
      this.router.navigateByUrl("");
    }
  }
}
