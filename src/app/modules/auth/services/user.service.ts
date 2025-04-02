import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../types/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly http = inject(HttpClient);

  createUser(data: User): Observable<User> {
    return this.http.post<User>('users', data);
  }
}
