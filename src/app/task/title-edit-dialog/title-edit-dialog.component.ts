import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  taskId: number;
}

@Component({
  selector: 'app-title-edit-dialog',
  templateUrl: './title-edit-dialog.component.html',
  styleUrls: ['./title-edit-dialog.component.scss']
})
export class TitleEditDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TitleEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
