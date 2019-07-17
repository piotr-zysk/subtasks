import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../models/task';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-task-edit-form',
  templateUrl: './task-edit-form.component.html',
  styleUrls: ['./task-edit-form.component.scss']
})
export class TaskEditFormComponent implements OnInit {

  @Input() task: Task;
  @Output() formClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  taskForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.taskForm = new FormGroup({
      title: new FormControl(),
      done: new FormControl()
     });
  }

  onCancel() {
    this.formClose.emit(false);
  }

  save() {
    this.formClose.emit(false);
  }
}
