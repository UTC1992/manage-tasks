import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TaskHomeComponent } from '@app/modules/tasks/pages/task-home/task-home.component';
import { LoginService } from '../auth/services/login.service';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
  declarations: [],
  imports: [CommonModule, TasksRoutingModule, TaskHomeComponent],
  providers: [LoginService, { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }],
})
export class TasksModule {}
