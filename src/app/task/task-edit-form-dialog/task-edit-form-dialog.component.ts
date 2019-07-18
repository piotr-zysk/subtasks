import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Task } from '../models/task';

export interface DialogData {
  task: Task;
}

@Component({
  selector: 'app-task-edit-form-dialog',
  templateUrl: './task-edit-form-dialog.component.html',
  styleUrls: ['./task-edit-form-dialog.component.scss']
})
export class TaskEditFormDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TaskEditFormDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }

  onFormClose(save: boolean): void {
    this.dialogRef.close(save);
  }
}
