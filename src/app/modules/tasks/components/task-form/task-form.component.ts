import { Component, inject } from '@angular/core';

import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-task-form',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogActions,
    MatButtonModule,
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
  standalone: true,
})
export class TaskFormComponent {
  dialogRef = inject(MatDialogRef<TaskFormComponent>);
  data = inject<{
    id: number;
    name: string;
  }>(MAT_DIALOG_DATA);
}
