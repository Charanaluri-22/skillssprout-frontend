import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Login } from '../models/login.model';
import { BACKEND_BASE_URL } from '../constant';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private readonly http: HttpClient) {}

  register(user: User): Observable<any> {
    return this.http.post(`${BACKEND_BASE_URL}/api/user/register`, user);
  }

  login(login: Login): Observable<any> {
    return this.http.post<Login>(`${BACKEND_BASE_URL}/api/user/login`, login);
  }
}
