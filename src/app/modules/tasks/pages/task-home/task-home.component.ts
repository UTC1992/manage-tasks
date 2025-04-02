import { Component, inject } from '@angular/core';
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
  Subscription,
  switchMap,
} from 'rxjs';
import { Task } from '../../model/task.model';
import { TaskService } from '../../services/task.service';
import { NotifyService } from '@app/shared/services/notify.service';
import { TaskStoreService } from '../../services/task-store.service';

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
  private readonly dialog = inject(MatDialog);
  private readonly taskService = inject(TaskService);
  private readonly notify = inject(NotifyService);
  private readonly taskStore = inject(TaskStoreService);

  private readonly refresh$ = new Subject<void>();
  private readonly subscription = new Subscription();

  tareas$: Observable<Task[]> = this.refresh$.pipe(
    startWith(undefined),
    switchMap(() => this.taskService.getTasks()),
    catchError((error) => {
      console.error('Error al cargar las tareas:', error);
      this.notify.error('Error al cargar las tareas');
      return of([]);
    })
  );

  ngOnInit(): void {
    this.subscription.add(
      this.taskStore.selectedTask$.subscribe((task) => {
        if (task) {
          this.onOpenDialog(task);
          this.taskStore.clearSelected();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onOpenDialog(task?: Task): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = task;
    dialogConfig.width = '400px';

    const dialogRef = this.dialog.open(TaskFormComponent, dialogConfig);

    dialogRef.afterClosed().subscribe({
      next: (result: Task | undefined) => {
        if (result === undefined) {
          return;
        }

        if (task) {
          this.updateTask({ ...result, id: task.id });
        } else {
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

  updateTask(task: Task): void {
    this.taskService.updateTask(task).subscribe({
      next: () => {
        this.refresh();
        this.notify.success('Tarea actualizada exitosamente ✅');
      },
      error: (error) => {
        console.error('Error al actualizar la tarea:', error);
        this.notify.error('Error al actualizar la tarea ❌');
      },
    });
  }

  refresh(): void {
    this.refresh$.next();
  }
}
