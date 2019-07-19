import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { EntityState} from '../models/entitystate';
import { TaskEntityState } from '../models/task-entitystate';

@Injectable({
  providedIn: 'root'
})
export class DataService {
 /*
  private tasks_: Task[] = [
    { id: 1, title: 'buba', done: false, items: [{ id: 2, title: 'buba1' }, { id: 2, title: 'buba2' }] },
    {
      id: 11, title: 'epdflepfjrj', items: [
        { id: 13, title: 'deodjeo' }, { id: 14, title: 'edeoepppw' }, { id: 15, title: 'eded dwd   wedwew' }
      ]
    }
  ]
  */

  filteredTaskIds: number[];
  filter = '';

  // private tasks: EntityState<Task> = {
  //   ids: [1, 11],
  //   entities: {
  //     1: { id: 1, title: 'buba', done: false, items: [{ id: 2, title: 'buba1' }, { id: 3, title: 'buba2' }] },
  //     11: {
  //       id: 11, title: 'epdflepfjrj', items: [
  //         { id: 13, title: 'deodjeo' }, { id: 14, title: 'edeoepppw' }, { id: 15, title: 'eded dwd   wedwew' }
  //       ]
  //     }
  //   }
  // };

  private tasks: TaskEntityState;

  constructor() {
    this.tasks = new TaskEntityState();
    this.tasks.add({ id: 1, title: 'buba', done: false, items: [{ id: 2, title: 'buba1' }, { id: 3, title: 'buba2' }] });
    this.tasks.add({id: 11, title: 'epdflepfjrj', items: [
              { id: 13, title: 'deodjeo' }, { id: 14, title: 'edeoepppw' }, { id: 15, title: 'eded dwd   wedwew' }]});
    this.tasks.resetState();

   }

  getAllTasks(): TaskEntityState {
    return this.tasks;
  }

  setAllTasks(tasks: TaskEntityState) {
    this.tasks = tasks;
  }

  performFilter(filterBy: string): number[] {
    filterBy = filterBy.toLowerCase();
    return this.tasks.ids.filter((id: number) =>
      (this.tasks.entities[id].title.toLowerCase().indexOf(filterBy) !== -1)
      || (this.tasks.entities[id].items.some(item => item.title.toLowerCase().indexOf(filterBy) !== -1)));
  }

  reApplyFilter() {
    this.filteredTaskIds = this.performFilter(this.filter);
  }
}
