import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TasklistComponent } from './tasklist.component';

import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TasklistComponent],
  imports: [
    CommonModule,
    TaskRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class TaskModule { }
