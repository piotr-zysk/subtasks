import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private tasks: Task[] = [
    {id: 1, title:'buba', items: [{id:2, title:'buba1'},{id:2, title:'buba2'}]},
    {id: 11, title:'epdflepfjrj', items: [{id:13, title:'deodjeo'},{id:14, title:'edeoepppw'},{id:15, title:'eded dwd   wedwew'}]}
  ]

  constructor() { }

  loadAllTasks(): Task[] {
    return this.tasks;
  }
}
