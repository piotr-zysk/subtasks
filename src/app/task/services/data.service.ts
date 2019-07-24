import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { EntityState} from '../models/entitystate';
import { TaskEntityState } from '../models/task-entitystate';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  filteredTaskIds: number[];
  filter = '';

  apiUrl = 'http://localhost/subtaskapi/api/';

  private tasks: TaskEntityState;

  constructor(private http: HttpClient) {
    this.tasks = new TaskEntityState();
    this.tasks.add({ id: 1, title: 'buba', done: false, items: [{ id: 2, title: 'buba1' }, { id: 3, title: 'buba2' }] });
    this.tasks.add({id: 11, title: 'epdflepfjrj', items: [
              { id: 13, title: 'deodjeo' }, { id: 14, title: 'edeoepppw' }, { id: 15, title: 'eded dwd   wedwew' }]});
    this.tasks.resetState();
    this.tasks.state.maxId = this.getMaxId();

    // this.getAllTasksFromDB();

   }

  getMaxId(): number {
    let maxId = 0;
    for (const e of Object.values(this.tasks.entities)) {
      if (e.id > maxId) { maxId = e.id; }
      e.items.forEach(i => {
        if (i.id > maxId) { maxId = i.id; }
      });
    }
    return maxId;
  }

  getAllTasks(): TaskEntityState {
    return this.tasks;
  }

  setAllTasks(tasks: TaskEntityState) {
    this.tasks = tasks;
  }

  performFilter(filterBy: string): number[] {
    // if (this.filteredTaskIds.length === this.tasks.ids.length) { this.tasks.ids = this.filteredTaskIds; }
    filterBy = filterBy.toLowerCase();
    return this.tasks.ids.filter((id: number) =>
      (this.tasks.entities[id].title.toLowerCase().indexOf(filterBy) !== -1)
      || (this.tasks.entities[id].items.some(item => item.title.toLowerCase().indexOf(filterBy) !== -1)));
  }

  reApplyFilter() {
    this.filteredTaskIds = this.performFilter(this.filter);
  }

  updateDB() {
    if (this.filteredTaskIds.length === this.tasks.ids.length) { this.tasks.ids = this.filteredTaskIds; }
    const changes = new TaskEntityState(); // object to be sent to backend server
    changes.state = this.tasks.state;
    changes.ids = this.tasks.ids;
    changes.state.outOfSync.forEach(el => changes.entities[el] = this.tasks.entities[el]);

    // console.log(changes);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    this.http.post<TaskEntityState>(this.apiUrl + 'save', changes, httpOptions).subscribe(x => {
      this.tasks.resetState();
      this.reApplyFilter();
      console.log('State saved.');
    });

    // this.getAllTasksFromDB();
  }

  getAllTasksFromDB() {
    // tslint:disable-next-line: deprecation
    this.http.get(this.apiUrl).subscribe(t => {
      this.tasks = new TaskEntityState(t as TaskEntityState);
      this.reApplyFilter();
    });
  }
}
