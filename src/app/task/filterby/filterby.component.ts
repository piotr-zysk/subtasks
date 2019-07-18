import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { EntityState } from '../models/entitystate';
import { Task } from '../models/task';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-filterby',
  templateUrl: './filterby.component.html',
  styleUrls: ['./filterby.component.scss']
})
export class FilterbyComponent implements OnInit {

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
  constructor(private dataService: DataService) {
    this.filteredTaskIds = this.tasks.ids;
  }


  ngOnInit() {
    const searchBox = document.getElementById('searchBox');

    const typeahead = fromEvent(searchBox, 'input').pipe(
      map((e: KeyboardEvent) => (e.target as HTMLInputElement).value),
      filter(text => text.length > 1 || text.length === 0),
      debounceTime(500),
      distinctUntilChanged()
    );

    typeahead.subscribe(data => {
      this.dataService.filter = data;
      this.filteredTaskIds = this.dataService.performFilter(data);
    });

  }

}
