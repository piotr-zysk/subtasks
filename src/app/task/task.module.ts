import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TasklistComponent } from './tasklist.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [TasklistComponent],
  imports: [
    CommonModule,
    TaskRoutingModule,
    SharedModule
  ]
})
export class TaskModule { }
