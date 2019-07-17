import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TasklistComponent } from './tasklist.component';

import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TitleEditDialogComponent } from './title-edit-dialog/title-edit-dialog.component';
import { FilterbyComponent } from './filterby/filterby.component';
import { TaskDeleteDialogComponent } from './task-delete-dialog/task-delete-dialog.component';
import { TaskEditFormDialogComponent } from './task-edit-form-dialog/task-edit-form-dialog.component';
import { TaskEditFormComponent } from './task-edit-form/task-edit-form.component';


@NgModule({
  declarations: [
    TasklistComponent,
    TitleEditDialogComponent,
    FilterbyComponent,
    TaskDeleteDialogComponent,
    TaskEditFormDialogComponent,
    TaskEditFormComponent],
  imports: [
    CommonModule,
    TaskRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    TitleEditDialogComponent,
    TaskDeleteDialogComponent,
    TaskEditFormDialogComponent
  ]
})
export class TaskModule { }
