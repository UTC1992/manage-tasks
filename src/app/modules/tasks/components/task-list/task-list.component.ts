import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { TaskItemComponent } from '@app/modules/tasks/components/task-item/task-item.component';

@Component({
  selector: 'app-task-list',
  imports: [MatListModule, MatCardModule, TaskItemComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {}
