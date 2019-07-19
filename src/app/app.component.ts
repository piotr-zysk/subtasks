import { Component, NgZone } from '@angular/core';
import { Task } from './task/models/task';
import { TaskEditFormDialogComponent } from './task/task-edit-form-dialog/task-edit-form-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from './task/services/data.service';

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

  constructor(zone: NgZone, public dialog: MatDialog, private router: Router, private dataservice: DataService) {
    this.mediaMatcher.addEventListener('change', mql =>
      zone.run(() => this.mediaMatcher = this.mediaMatcher));
  }


  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }

  gotoTestPage() {
    this.router.navigate(['/test']);
  }

  updateDB() {
    this.dataservice.updateDB();
  }

}
