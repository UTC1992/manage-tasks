import { Component, Input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { TaskItemComponent } from '@app/modules/tasks/components/task-item/task-item.component';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';
import { Task } from '../../model/task.model';

@Component({
  selector: 'app-task-list',
  imports: [MatListModule, MatCardModule, TaskItemComponent, CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  @Input() tasks: Observable<Task[]> = of([]);
}
