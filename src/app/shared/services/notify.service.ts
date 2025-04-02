import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotifyService {
  private readonly snackBar = inject(MatSnackBar);

  success(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: 'success',
    });
  }

  error(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 4000,
      panelClass: 'error',
    });
  }

  info(message: string): void {
    this.snackBar.open(message, 'OK', { duration: 3000, panelClass: 'info' });
  }

  warn(message: string): void {
    this.snackBar.open(message, 'OK', { duration: 4000, panelClass: 'warn' });
  }
}
