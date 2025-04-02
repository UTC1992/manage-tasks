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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { getGap, GapState } from './styles';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';

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
    MatDatepickerModule,
    ReactiveFormsModule,
    CommonModule,
    MatCheckboxModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent {
  dialogRef = inject(MatDialogRef<TaskFormComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly fb = inject(FormBuilder);

  readonly getGap = getGap;

  readonly form = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    completed: [false],
    createdAt: [new Date()],
  });

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  get isTitleRequiredError(): GapState {
    return this.form.get('title')?.hasError('required') ? 'error' : 'default';
  }

  get isDescriptionRequiredError(): GapState {
    return this.form.get('description')?.hasError('required')
      ? 'error'
      : 'default';
  }

  get isCreatedAtRequiredError(): GapState {
    return this.form.get('createdAt')?.hasError('required')
      ? 'error'
      : 'default';
  }
}
