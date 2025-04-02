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
import {
  catchError,
  Observable,
  of,
  startWith,
  Subject,
  switchMap,
} from 'rxjs';
import { Task } from '../../model/task.model';
import { TaskService } from '../../services/task.service';
import { NotifyService } from '@app/shared/services/notify.service';

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
  private readonly refresh$ = new Subject<void>();

  constructor(
    private readonly dialog: MatDialog,
    private readonly taskService: TaskService,
    private readonly notify: NotifyService
  ) {
    this.tareas$ = this.refresh$.pipe(
      startWith(undefined),
      switchMap(() => this.taskService.getTasks()),
      catchError((error) => {
        console.error('Error al cargar las tareas:', error);
        return of([]);
      })
    );
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = { id: 123, name: 'Angular' };
    dialogConfig.width = '400px';
    const dialogRef = this.dialog.open(TaskFormComponent, dialogConfig);

    dialogRef.afterClosed().subscribe({
      next: (result: Task | undefined) => {
        if (result !== undefined) {
          this.createTask(result);
        }
      },
      error: (error) => {
        console.error('Error al cerrar el diálogo:', error);
        this.notify.error('Error al cerrar el diálogo ❌');
      },
    });
  }

  createTask(task: Task): void {
    this.taskService.createTask(task).subscribe({
      next: () => {
        this.refresh();
        this.notify.success('Tarea creada exitosamente ✅');
      },
      error: (error) => {
        console.error('Error al crear la tarea:', error);
        this.notify.error('Error al crear la tarea ❌');
      },
    });
  }

  refresh(): void {
    this.refresh$.next();
  }
}
