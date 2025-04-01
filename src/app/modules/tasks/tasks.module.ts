import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TaskHomeComponent } from '@app/modules/tasks/pages/task-home/task-home.component';
import { LoginService } from '../auth/services/login.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, TasksRoutingModule, TaskHomeComponent],
  providers: [LoginService],
})
export class TasksModule {}
