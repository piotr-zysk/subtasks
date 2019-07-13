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

  // stop propagating click event to paren component
  onEvent(event) {
    event.stopPropagation();
 }

}
