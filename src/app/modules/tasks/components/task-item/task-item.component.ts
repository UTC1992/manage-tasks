import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-task-item',
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatListModule],
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent {
  @Input() title: string;
  @Input() description: string;
  @Input() completed: boolean;
  @Input() createdAt: Date;

  constructor() {
    this.title = '';
    this.description = '';
    this.completed = false;
    this.createdAt = new Date();
  }
}
