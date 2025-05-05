import { Component, Input, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../auth/auth.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {HttpClient} from "@angular/common/http";
import {ApiService} from "../../Services/ApiService";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  @Input() type: any;

  protected readonly localStorage = localStorage;
  items: any;
  currentRoutePath: string | undefined;
  isTenant: any = false;
  lastName: any;
  firstName: any;
  pin: any;
  email: any;
  phoneNumber: any;
  accountNumber: any;
  password: any;
  isOwner: any = false;
  driverLicense: any;
  passwordVisible: any = false;
  bank: any;
  banks: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    public authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private apiService: ApiService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.currentRoutePath  = window.location.pathname;

    if (this.currentRoutePath == '/about'){
      this.scrollToMain();
    }
    this.banks = [
          {
              id: 1,
              name: 'Хаан банк',
              iconSrc: 'assets/bnks/khanbank.png'
          },
          {
              id: 2,
              name: 'Голомт банк',
              iconSrc: 'assets/bnks/golomtbank.png'
          },
          {
              id: 3,
              name: 'Хас банк',
              iconSrc: 'assets/bnks/khasbank.png'
          },
          {
              id: 4,
              name: 'М банк',
              iconSrc: 'assets/bnks/mbank.png'
          },
          {
              id: 5,
              name: 'Төрийн банк',
              iconSrc: 'assets/bnks/statebank.png'
          },
          {
              id: 6,
              name: 'Богд банк',
              iconSrc: 'assets/bnks/bogd.png'
          },
      ]

  }

  // Scroll event listener
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    this.currentRoutePath  = window.location.pathname;
    const topbar = document.getElementById('topbar');
    if (topbar && this.currentRoutePath == '/about') {
      if ( !this.authService.isAuthenticated() && window.scrollY > 0) {
        topbar.style.background = "white";
        topbar.style.color = "var(--main-blue)";
        topbar.style.boxShadow = "0 0 10px -3px";
      } else {
        topbar.style.background = "transparent";
        topbar.style.color = "white";
        topbar.style.boxShadow = "none";
      }
    }

    const logo = document.getElementById('logo');
    if (logo) {
      logo.style.background = "transparent";
      logo.style.boxShadow = "none";
      logo.style.webkitBoxShadow = "none";
    }
  }

  scrollToAbout() {
    const element = document.getElementById('about');
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offset = window.innerHeight / 2 - element.clientHeight / 2;

      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
    this.topbarChange();
  }

  scrollToRent() {
    const element = document.getElementById('rent');
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offset = window.innerHeight / 2 - element.clientHeight / 2;

      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
    this.topbarChange();
  }

  scrollToRental() {
    const element = document.getElementById('rental');
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offset = window.innerHeight / 2 - element.clientHeight / 2;

      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
    this.topbarChange();
  }

  scrollToMain() {
    !this.authService.isAuthenticated() ? this.router.navigate(["/about"]) : '';

    const topbar = document.getElementById('topbar');
    if (topbar) {
      topbar.style.background = "transparent";
      topbar.style.color = "white";
      topbar.style.boxShadow = "none";
    }

    const element = document.getElementById('main');
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offset = window.innerHeight / 2 - element.clientHeight / 2;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  }

  visibleRegister: any = false;
  topbarChange() {
    const topbar: any = document.getElementById('topbar');
    topbar.style.background = "white";
    topbar.style.color = "var(--main-blue)";
    topbar.style.boxShadow = "0 0 10px -3px";

    const logo = document.getElementById('logo');
    if (logo) {
      logo.style.background = "transparent";
      logo.style.boxShadow = "none";
      logo.style.webkitBoxShadow = "none";
    }
  }

  logout(event: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Та системээс гарахдаа итгэлтэй байна уу?',
      header: 'Системээас гарах',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",
      acceptLabel:"Тийм",
      rejectLabel:"Үгүй",
      accept: () => {

        this.authService.logout();
        this.messageService.add({ severity: 'info', summary: '', detail: 'Системээс гарлаа.' });
      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: '', detail: 'Системээс гарах үйлдлийг цуцаллаа' });
      }
    });
  }

  refresh() {
    window.location.reload();
  }

  navigate(role: string) {
    this.topbarChange();

    this.authService.setRole(role);
    if (role == 'restaurant') {
        this.router.navigate(['/restaurant/dashboard']);
    }
    if (role == 'menu') {
      this.router.navigate(['/menu/dashboard']);
    }
    if (role == 'product') {
      this.router.navigate(['/product/dashboard']);
    }
  }

  user() {
    let userId = localStorage.getItem('userId');
    this.apiService.getUserInfo(userId).subscribe((result: any) => {
        let user = result.user;
        let roles = result.roles;
        roles.forEach((it: any) => {
          if(it.roleId == 1) this.isOwner = true;
          if(it.roleId == 2) this.isTenant = true;
        })
          this.lastName = user.lastName;
          this.firstName = user.firstName;
          this.pin = user.registerNumber;
          this.email = user.mailAddress;
          this.phoneNumber = user.phoneNumber;
          this.accountNumber = user.bankAccountNumber;
          this.password = user.password;
          this.driverLicense = user.driverLicenseNumber;
          this.bank = this.banks.find((it:any) => it.id == user.bankId);
          this.visibleRegister = true;

      });
  }
}

