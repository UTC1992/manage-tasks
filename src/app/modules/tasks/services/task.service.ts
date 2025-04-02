import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../model/task.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private readonly http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>('tasks');
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>('tasks', task);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`tasks/${task.id}`, task);
  }

  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(`tasks/${taskId}`);
  }
}
