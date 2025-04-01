import { provideRouter, Routes, withDebugTracing } from '@angular/router';
import { authGuard } from './modules/auth/guards/auth.guard';
import { ApplicationConfig } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./modules/tasks/tasks.module').then((m) => m.TasksModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
];

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withDebugTracing())],
};
