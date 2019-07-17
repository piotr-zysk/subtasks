import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../models/task';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { DataService } from '../services/data.service';
import { EntityState } from '../models/entitystate';

@Component({
  selector: 'app-task-edit-form',
  templateUrl: './task-edit-form.component.html',
  styleUrls: ['./task-edit-form.component.scss']
})
export class TaskEditFormComponent implements OnInit {

  @Input() task: Task;
  @Output() formClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  taskForm: FormGroup;

  get tasks(): EntityState<Task> {
    return this.dataService.getAllTasks();
  }
  // this is actually not needed as long as we reference tasks and only mutate that object
  set tasks(value: EntityState<Task>) {
    this.dataService.setAllTasks(value);
  }
  constructor(private dataService: DataService, private fb: FormBuilder) { }

  items = [];

  ngOnInit() {


  this.task.items.forEach(el => {
    console.log(el.title);
    this.items.push(this.fb.group({
      title: el.title,
      done: el.done
    }));

  });


  this.taskForm = this.fb.group({
      title: this.task.title,
      done: this.task.done,
      items: this.fb.array(this.items)
     });

  console.log(this.taskForm);
  }

  get items_() {
    return this.taskForm.get('items') as FormArray;
  }


  onCancel() {
    this.formClose.emit(false);
  }

  save() {
    console.log(this.taskForm);
    if (this.taskForm.dirty && this.taskForm.valid) {
      this.tasks.entities[this.task.id].title = this.taskForm.value.title;
      this.tasks.entities[this.task.id].done = this.taskForm.value.done;
    }

    this.formClose.emit(false);
  }
}
