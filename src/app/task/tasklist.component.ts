import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from './services/data.service';
import { EntityState } from './models/entitystate';
import { Task } from './models/task';
import { TitleEditDialogComponent } from './title-edit-dialog/title-edit-dialog.component';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';



@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.scss']
})
export class TasklistComponent implements OnInit {

  taskFilter = '';

  get filteredTaskIds(): number[] {
    return this.dataService.filteredTaskIds;
  }
  set filteredTaskIds(value: number[]) {
    this.dataService.filteredTaskIds = value;
  }

  get tasks(): EntityState<Task> {
    return this.dataService.getAllTasks();
  }
  // this is actually not needed as long as we reference tasks and only mutate that object
  set tasks(value: EntityState<Task>) {
    this.dataService.setAllTasks(value);
  }

  constructor(private dataService: DataService, public dialog: MatDialog) { }

  ngOnInit() {
    // const t = new Task();
    // t.id = 100;
    // t.title = 'bubu';
    // t.done = true;
    // t.items = [{ id: 2, title: 'buba1' }, { id: 3, title: 'buba2' }];

    // const newTasks: EntityState<Task> = {ids: [], entities: {}};
    // newTasks.entities = this.tasks.entities;
    // newTasks.entities[100] = t;
    // newTasks.ids = this.tasks.ids;
    // newTasks.ids.unshift(100);

    // this.tasks = newTasks;   //add if state immutable

    // or mutate existing state
    // this.tasks.entities[100] = t;
    // this.tasks.ids.push(100);

    // console.log(this.tasks.ids);
  }

  processTask(id: number) {
    if (!this.tasks.entities[id].done) {
      this.tasks.entities[id].items.forEach(element => {
        element.done = true;
      });
    }
  }

  processSubtask(taskId: number, subtaskIndex: number, subtaskId: number) {
    if (!this.tasks.entities[taskId].items[subtaskIndex].done) {
      if (this.tasks.entities[taskId].items.every(el => el.done || el.id === subtaskId)) {
        this.tasks.entities[taskId].done = true;
      }
    } else {
      this.tasks.entities[taskId].done = false;
    }
  }

  openTitleRenameDialog(task, subtaskIndex?): void {

    let title: string;
    if (subtaskIndex === undefined) {
      subtaskIndex = -1;
      title = task.title;
    } else {
      title = task.items[subtaskIndex].title;
    }

    const dialogRef = this.dialog.open(TitleEditDialogComponent, {
      width: '400px',
      data: { taskTitle: title, subtaskIndex, taskId: task.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.subtaskIndex === -1) {
        this.tasks.entities[result.taskId].title = result.taskTitle;
      } else {
        this.tasks.entities[result.taskId].items[subtaskIndex].title = result.taskTitle;
      }
    });
  }
}
