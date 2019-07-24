import { EntityState } from './entitystate';
import { Task } from './task';

export class TaskEntityState implements EntityState<Task>  {
  ids: number[];
  entities: { [id: number]: Task };
  state: State;

  constructor(t?: TaskEntityState) {
    if (t) {
    this.ids = t.ids;
    this.entities = t.entities;
    this.state = t.state;
    } else {
    this.ids = [];
    this.entities = {};
    // tslint:disable-next-line: no-use-before-declare
    this.state = new State();
    }
  }


  add(element: Task) {
    this.entities[element.id] = element;
    this.ids.push(element.id);
    this.setDirty(element.id);
  }

  update(element: Task) {
    this.entities[element.id] = element;
    this.setDirty(element.id);
    // console.log(this.state.outOfSync);
  }

  setDirty(taskId: number) {
    if (this.state.outOfSync.indexOf(taskId) === -1) { this.state.outOfSync.push(taskId); }
  }

  resetState() {
    this.state.itemsToDelete = [];
    this.state.outOfSync = [];
  }

  markDeletedTask(task: Task) {
    if (this.state.outOfSync.indexOf(task.id) !== -1) { this.state.outOfSync = this.state.outOfSync.filter(el => el !== task.id); }
    this.state.itemsToDelete.push(task.id);
    task.items.forEach(el => this.state.itemsToDelete.push(el.id));
    // console.log(this.state.itemsToDelete);
  }

  markDeletedItem(itemId: number) {
    this.state.itemsToDelete.push(itemId);
  }
}

class State {
  itemsToDelete: number[];
  outOfSync: number[];
  maxId: number;

  constructor() {
    this.itemsToDelete = []; // ids of all leads (tasks, subtasks) to be deleted from backend database
    this.outOfSync = []; // ids of dirty tasks (needed to be updated in backend/databases)
    this.maxId = 0;
  }
}
