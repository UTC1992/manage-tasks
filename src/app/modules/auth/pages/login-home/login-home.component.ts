import { Component, inject } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { NotifyService } from '@app/shared/services/notify.service';
import { LoginForm } from '../../types/login';
import { UserService } from '../../services/user.service';
import { TokenService } from '@app/core/services/token.service';

@Component({
  selector: 'app-login-home',
  imports: [LoginFormComponent, MatGridListModule],
  templateUrl: './login-home.component.html',
  styleUrl: './login-home.component.scss',
})
export class LoginHomeComponent {
  readonly authService = inject(LoginService);
  readonly router = inject(Router);
  readonly notify = inject(NotifyService);
  readonly userService = inject(UserService);
  readonly tokenService = inject(TokenService);

  onSubmit(value: LoginForm): void {
    this.onLogin(value);
  }

  onLogin(value: LoginForm): void {
    this.authService.login(value).subscribe({
      next: (res) => {
        this.tokenService.setToken(res.token);
        this.router.navigate(['/tasks']);
      },
      error: (err) => {
        console.error('Error en login', err);
        const confirmCreate = confirm(
          `Usuario no registrado,  ¿Desea crear el usuario "${value.email}"?`
        );
        if (confirmCreate) {
          this.createUser(value);
        }
      },
    });
  }
  createUser(value: LoginForm): void {
    this.userService.createUser(value).subscribe({
      next: (res) => {
        console.log('Usuario creado exitosamente', res);
        this.onLogin(value);
      },
      error: (err) => {
        console.error('Error al crear usuario', err);
        this.notify.error('No se pudo crear el usuario');
      },
    });
  }
}
