import { Component, NgZone } from '@angular/core';
import { Task } from './task/models/task';
import { TaskEditFormDialogComponent } from './task/task-edit-form-dialog/task-edit-form-dialog.component';
import { MatDialog } from '@angular/material/dialog';

const SMALL_WIDTH_BREAKPOINT = 720;




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'subtasks';
  sidenavStatus = 'ON';

  items = [
    'Item 1',
    'Item 2',
    'Settings'
  ];

  private mediaMatcher: MediaQueryList =
    matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);

  constructor(zone: NgZone, public dialog: MatDialog) {
    this.mediaMatcher.addEventListener('change', mql =>
      zone.run(() => this.mediaMatcher = this.mediaMatcher));
  }


  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }


}
