import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import {MessageService} from "primeng/api";
import {ApiService} from "../Services/ApiService";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  phoneNumber: any;
  password: any;
  displayRoles: any = false;
  passwordVisible: boolean = false;  // To control password visibility
  tenant: any = true;
  owner: any = true;
  visibleResetPassword: any = false;
  mailAddress: any;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.displayRoles = this.authService.isAuthenticated();
  }

  login() {
    if(!this.phoneNumber || !this.password){
      return this.messageService.add({ severity: 'warning', summary: 'Амжилтгүй', detail: 'Нэвтрэх нэр, нууц үгээ зөв оруулна уу.' });
    }
    this.authService.login(this.phoneNumber, this.password).subscribe({
      next: (user) => {
        if(user != null){
          this.displayRoles = true;
        }
      },
      error: (error) => {
        console.log('Invalid username or password');

      }
    });
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  sendPass() {
    this.apiService.getPassword(this.mailAddress).subscribe(() => {
        this.messageService.add({
          severity: "info",
          summary: "Нууц үг илгээлээ.",
          detail: "Та мейл хаягаа шалгана уу"
        })
        this.visibleResetPassword = false;
      });
  }
}
