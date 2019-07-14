import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { EntityState } from './models/entitystate';
import { Task } from './models/task';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.scss']
})
export class TasklistComponent implements OnInit {
  tasks: EntityState<Task>;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.tasks = this.dataService.loadAllTasks();
    console.log(this.tasks.ids);
  }

  processSubtasks(id: number) {

    if (!this.tasks.entities[id].done) {
      this.tasks.entities[id].items.forEach(element => {
        element.done = true;
     });
    }
  }
}
