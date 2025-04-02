import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../model/task.model';

@Injectable({ providedIn: 'root' })
export class TaskStoreService {
  private readonly selectedTaskSubject = new BehaviorSubject<Task | undefined>(
    undefined
  );
  readonly selectedTask$: Observable<Task | undefined> =
    this.selectedTaskSubject.asObservable();

  private readonly taskToDeleteSubject = new BehaviorSubject<Task | undefined>(
    undefined
  );
  readonly taskToDelete$ = this.taskToDeleteSubject.asObservable();

  selectTask(task: Task): void {
    this.selectedTaskSubject.next(task);
  }

  clearSelected(): void {
    this.selectedTaskSubject.next(undefined);
  }

  confirmDelete(task: Task): void {
    this.taskToDeleteSubject.next(task);
  }

  clearDelete(): void {
    this.taskToDeleteSubject.next(undefined);
  }
}
