import { Component } from '@angular/core';
import { TaskListComponent } from '@app/modules/tasks/components/task-list/task-list.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogModule,
} from '@angular/material/dialog';
import { TaskFormComponent } from '@app/modules/tasks/components/task-form/task-form.component';

@Component({
  selector: 'app-task-home',
  imports: [
    TaskListComponent,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
  ],
  templateUrl: './task-home.component.html',
  styleUrl: './task-home.component.scss',
  standalone: true,
})
export class TaskHomeComponent {
  constructor(private readonly dialog: MatDialog) {}

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();

    // Configure the dialog options
    dialogConfig.disableClose = true; // Prevents closing the dialog by clicking outside
    dialogConfig.autoFocus = false; // Disable autofocus to manually control focus
    dialogConfig.width = '80%'; // Set the width of the dialog
    dialogConfig.data = { id: 123, name: 'Angular' }; // Pass data to the dialog component
    dialogConfig.autoFocus = 'input[name="testName"]'; //Pass autoFoucs field
    this.dialog.open(TaskFormComponent, dialogConfig);
  }
}
