import { Component } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-login-home',
  imports: [LoginFormComponent, MatGridListModule],
  templateUrl: './login-home.component.html',
  styleUrl: './login-home.component.scss',
})
export class LoginHomeComponent {}
