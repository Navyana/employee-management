import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { LoginComponent } from "./login/login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { EmployeeComponent } from "./employee/employee.component";
import { ToastrModule } from "ngx-toastr";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatGridListModule } from "@angular/material/grid-list";
import { NgxPaginationModule } from "ngx-pagination";
import { MatMenuModule } from "@angular/material/menu";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { ErrorpageComponent } from "./errorpage/errorpage.component";

const appRoutes: Routes = [
  {
    path: "",
    component: EmployeeComponent,
    pathMatch: "full",
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "error",
    component: ErrorpageComponent,
  },
  {
    path: "**",
    component: EmployeeComponent,
  },
];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    EmployeeComponent,
    ErrorpageComponent,
    ErrorpageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    MatCardModule,
    MatIconModule,
    MatGridListModule,
    NgxPaginationModule,
    MatMenuModule,
    BrowserAnimationsModule,
    Ng2SearchPipeModule,
    ServiceWorkerModule.register("/ngsw-worker.js", {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: "registerWhenStable:30000",
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
