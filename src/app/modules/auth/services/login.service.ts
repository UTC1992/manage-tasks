import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginForm, LoginResponse } from '../types/login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  readonly http = inject(HttpClient);

  login(data: LoginForm): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('auth/login', data);
  }
}
