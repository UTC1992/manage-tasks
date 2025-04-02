import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginForm, LoginResponse } from '../types/login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  login(data: LoginForm): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('auth/login', data);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
