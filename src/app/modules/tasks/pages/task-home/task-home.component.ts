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
  BehaviorSubject,
  catchError,
  combineLatest,
  map,
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
import { TokenService } from '@app/core/services/token.service';
import { Router } from '@angular/router';
import { sortByCreatedAtDesc } from '../../utils/sortByCreatedAtDesc';
import { sortByCreatedAtAsc } from '../../utils/sortByCreatedAtAsc';

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
  private readonly tokenService = inject(TokenService);
  private readonly router = inject(Router);
  isOrderDesc = true;
  private readonly order$ = new BehaviorSubject<true | false>(this.isOrderDesc);

  tasks$: Observable<Task[]> = combineLatest([
    this.refresh$.pipe(startWith(undefined)),
    this.order$,
  ]).pipe(
    switchMap(() => this.taskService.getTasks()),
    map((tasks) => this.orderTasks(tasks)),
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

    this.subscription.add(
      this.taskStore.taskToDelete$.subscribe((task) => {
        if (task?.id) {
          const confirmDelete = confirm(`¿Eliminar tarea "${task.title}"?`);
          if (confirmDelete) {
            this.deleteTask(task.id);
          }
          this.taskStore.clearDelete();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  orderTasks(tasks: Task[]): Task[] {
    return this.isOrderDesc
      ? sortByCreatedAtDesc(tasks)
      : sortByCreatedAtAsc(tasks);
  }

  onChangeOrder() {
    this.isOrderDesc = !this.isOrderDesc;
    this.order$.next(this.isOrderDesc);
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

        task?.id
          ? this.updateTask({ ...result, id: task.id })
          : this.createTask(result);
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

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        this.refresh();
        this.notify.success('Tarea eliminada exitosamente ✅');
      },
      error: (error) => {
        console.error('Error al eliminar la tarea:', error);
        this.notify.error('Error al eliminar la tarea ❌');
      },
    });
  }

  refresh(): void {
    this.refresh$.next();
  }

  onLogout(): void {
    this.tokenService.clearToken();
    this.router.navigate(['/login']);
  }
}
