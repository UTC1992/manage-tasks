import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { TaskItemComponent } from '@app/modules/tasks/components/task-item/task-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  imports: [MatListModule, MatCardModule, TaskItemComponent, CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  tasks = [
    {
      title: 'Sample Task',
      description: 'This is a sample task description.',
      completed: false,
      createdAt: '01-01-2025',
    },
    {
      title: 'Sample Task 2',
      description: 'This is a sample task description 2.',
      completed: false,
      createdAt: '01-01-2025',
    },
    {
      title: 'Sample Task 3',
      description: 'This is a sample task description 3.',
      completed: false,
      createdAt: '01-01-2025',
    },
    {
      title: 'Sample Task 4',
      description: 'This is a sample task description 4.',
      completed: false,
      createdAt: '01-01-2025',
    },
    {
      title: 'Sample Task 5',
      description: 'This is a sample task description 5.',
      completed: false,
      createdAt: '01-01-2025',
    },
  ];
}
