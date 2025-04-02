import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../model/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private readonly http: HttpClient) {}

  getTasks() {
    return this.http.get<Task[]>('/tasks');
  }

  createTask(task: Task) {
    return this.http.post<Task>('/tasks', task);
  }

  updateTask(task: Task) {
    return this.http.put<Task>(`/tasks/${task.id}`, task);
  }

  deleteTask(taskId: number) {
    return this.http.delete<void>(`/tasks/${taskId}`);
  }
}
