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

interface DialogData {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

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
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  onNoClick(): void {
    // add form with data after editing
    this.dialogRef.close({
      title: '',
      description: '',
      completed: false,
      createdAt: '',
    });
  }
}
