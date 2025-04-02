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
import { Observable } from 'rxjs';
import { Task } from '../../model/task.model';
import { TaskService } from '../../services/task.service';

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
})
export class TaskHomeComponent {
  tareas$: Observable<Task[]>;

  constructor(
    private readonly dialog: MatDialog,
    private readonly taskService: TaskService
  ) {
    this.tareas$ = this.taskService.getTasks();
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = { id: 123, name: 'Angular' };
    dialogConfig.width = '400px';
    const dialogRef = this.dialog.open(TaskFormComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');

      if (result !== undefined) {
        console.log('data', result);
      }
    });
  }
}
