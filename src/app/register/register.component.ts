import {Component, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ApiService} from "../Services/ApiService";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
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
              private router: Router,
              private apiService: ApiService,
              private messageService: MessageService
              ) {
  }
  ngOnInit() {
    this.isTenant = false;
    this.isOwner = false;
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

  register() {
    if(!this.lastName){
      return this.messageService.add({
        severity: 'info',
        summary: 'Бүртгэл дутуу',
        detail: 'Хэрэглэгчийн овог талбараа бөглөнө үү.'});
    }
    if(!this.firstName){
      return this.messageService.add({
        severity: 'info',
        summary: 'Бүртгэл дутуу',
        detail: 'Хэрэглэгчийн нэр талбараа бөглөнө үү.'});
    }
    if(!this.pin){
      return this.messageService.add({
        severity: 'info',
        summary: 'Бүртгэл дутуу',
        detail: 'Регистерийн дугаар талбараа бөглөнө үү.'});
    }
    this.registerSyntax();
    if(!this.email){
      return this.messageService.add({
        severity: 'info',
        summary: 'Бүртгэл дутуу',
        detail: 'Цахим шуудан хаяг талбараа бөглөнө үү.'});
    }
    this.mailSyntax();
    if(!this.phoneNumber){
      return this.messageService.add({
        severity: 'info',
        summary: 'Бүртгэл дутуу',
        detail: 'Холбоо барих утасны дугаар талбараа бөглөнө үү.'});
    }
    if(!this.password){
      return this.messageService.add({
        severity: 'info',
        summary: 'Бүртгэл дутуу',
        detail: 'Нууц үг талбараа бөглөнө үү.'});
    }
    if(!this.bank){
      return this.messageService.add({
        severity: 'info',
        summary: 'Бүртгэл дутуу',
        detail: 'Банкаа сонгоно уу.'});
    }
    if(!this.accountNumber){
      return this.messageService.add({
        severity: 'info',
        summary: 'Бүртгэл дутуу',
        detail: 'Дансны дугаар талбараа бөглөнө үү.'});
    }
    let tenant = {
      "firstName":this.firstName,
      "lastName":this.lastName,
      "pin":this.pin,
      "phoneNumber": this.phoneNumber,
      "email":this.email,
      "password":this.password,
      "bankId": this.isOwner ? this.bank.id : '',
      "bankAccountNumber": this.isOwner ? this.accountNumber : '',
    };
    this.apiService.createUser(JSON.stringify(tenant)).subscribe((result: any) => {
      this.messageService.add({severity:"info", summary: result.message, detail: ""})

      this.router.navigate(['/login']);
    });
  }
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
  onKeydown(event: KeyboardEvent, input: string): void {
    let inputElement = event.target as HTMLInputElement;
    let value = inputElement.value;

    // Convert value to sentence case
    if(input == 'lastName') this.lastName = this.toSentenceCase(value);
    if(input == 'firstName') this.firstName = this.toSentenceCase(value);
    if(input == 'pin') this.pin = this.pin.toUpperCase();
  }

  private toSentenceCase(str: string): string {
    return str
      .toLowerCase()
      .replace(/(?:^|\s)\S/g, (match) => match.toUpperCase());
  }
  registerSyntax(){
    const pattern = /^[А-Я]{2}\d{8}$/;

    if (!pattern.test(this.pin)) {
      return this.messageService.add({
        severity: "info",
        summary: "Регистер буруу байна",
        detail: "Регистрийн дугаараа шалгана уу."
      })
    }
    return true;
  }
  mailSyntax(){
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(this.email)) {
      return this.messageService.add({
        severity: "info",
        summary: "Цахим шуудан буруу байна",
        detail: "Цахим шуудан хаягаа буруу оруулсан эсэхээ шалгана уу."
      })
    }
    return true;
  }

  phoneSyntax() {
    if(this.phoneNumber.length != 8){
      return this.messageService.add({
        severity: "info",
        summary: "Утасны дугаар буруу байна",
        detail: "Холбоо барих утасны дугаар 8 оронтой байх ёстой."
      })
    }
    return true;
  }
}
