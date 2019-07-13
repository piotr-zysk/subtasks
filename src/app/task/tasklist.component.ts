import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.sass']
})
export class TasklistComponent implements OnInit {
  tasks = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.tasks = this.dataService.loadAllTasks();
  }

  processSubtasks(id: number) {
    console.log(id);
  }
}
