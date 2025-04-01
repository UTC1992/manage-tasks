import { Component } from '@angular/core';
import { TaskListComponent } from '@app/modules/tasks/components/task-list/task-list.component';

@Component({
  selector: 'app-task-home',
  imports: [TaskListComponent],
  templateUrl: './task-home.component.html',
  styleUrl: './task-home.component.scss'
})
export class TaskHomeComponent {

}
