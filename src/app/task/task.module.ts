import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TasklistComponent } from './tasklist.component';

import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { TitleEditDialogComponent } from './title-edit-dialog/title-edit-dialog.component';

@NgModule({
  declarations: [TasklistComponent, TitleEditDialogComponent],
  imports: [
    CommonModule,
    TaskRoutingModule,
    SharedModule,
    FormsModule
  ],
  entryComponents: [TitleEditDialogComponent]
})
export class TaskModule { }
