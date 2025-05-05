import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import {ApiService} from "../Services/ApiService";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  constructor(
      private router: Router,
      private messageService: MessageService,
      private apiService: ApiService,
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  setRole(role: string) {
    localStorage.setItem('role', role);
  }

  login(username: string, password: string): Observable<any> {
    return this.apiService.login(username, password).pipe(
      map((result: any) => {
        if (result.status === 200) {
          const user = result.data;
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('userName', `${user.lastName.charAt(0)}.${user.firstName}`);
          localStorage.setItem('userId', user.id);

          this.currentUserSubject.next(user);
          this.router.navigate(['/restaurant/dashboard']).then(() => {});
          return user;
        } else {
          this.messageService.add({
            severity: "info",
            summary: "Login Failed",
            detail: result.message
          });
          return null;
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    localStorage.removeItem('tenant');
    localStorage.removeItem('owner');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']).then(() => {});
  }

  get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.currentUserValue;
  }
}
