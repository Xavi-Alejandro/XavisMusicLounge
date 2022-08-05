import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from './../environments/environment';
import jwt_decode from "jwt-decode";

import User from './User';
import RegisterUser from './RegisterUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  getToken(): string | null {
    return (localStorage.getItem('access_token'));
  }
  readToken(): User | null {
    const token = localStorage.getItem('access_token');
    if (token) {
      return jwt_decode(token);
    }
    else {
      return null;
    }
  }
  isAuthenticated(): Boolean {
    const token = localStorage.getItem('access_token');
    if (token) {
      console.log('token exists');
      return true;
    } else {
      console.log('no token');
      return false;
    }
  }
  login(user: User): Observable<any> {
    return this.http.post<any>(environment.userAPIBase + "/login", user, { observe: 'response' });
  }
  logout() {
    console.log("Before access token removal: " + localStorage.getItem('access_token'));
    localStorage.removeItem('access_token');
    console.log("After access token removal: " + localStorage.getItem('access_token'));
  }
  register(user: RegisterUser): Observable<any> {
    return this.http.post<any>(environment.userAPIBase + "/register", user, { observe: 'response' });
  }
}