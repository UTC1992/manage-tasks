import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TaskStoreService } from '../../services/task-store.service';
import { Task } from '../../model/task.model';

@Component({
  selector: 'app-task-item',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatTooltipModule,
  ],
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent {
  @Input() task: Task = {} as Task;

  private readonly taskStore = inject(TaskStoreService);

  onEdit(): void {
    this.taskStore.selectTask(this.task);
  }

  onDelete(): void {
    console.log('Delete task');
  }
}
