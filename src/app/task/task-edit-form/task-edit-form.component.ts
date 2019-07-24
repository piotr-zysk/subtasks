import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../models/task';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { EntityState } from '../models/entitystate';
import { TaskItem } from '../models/taskitem';
import { debounceTime } from 'rxjs/operators';
import { TaskEntityState } from '../models/task-entitystate';

@Component({
  selector: 'app-task-edit-form',
  templateUrl: './task-edit-form.component.html',
  styleUrls: ['./task-edit-form.component.scss']
})
export class TaskEditFormComponent implements OnInit {

  @Input() task: Task;
  @Output() formClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  taskForm: FormGroup;
  newTask: boolean;

  get tasks(): TaskEntityState {
    return this.dataService.getAllTasks();
  }
  // this is actually not needed as long as we reference tasks and only mutate that object
  set tasks(value: TaskEntityState) {
    this.dataService.setAllTasks(value);
  }
  constructor(private dataService: DataService, private fb: FormBuilder) { }

  items = [];
  formChanged = false;
  deletedItems = [];

  ngOnInit() {

  if (this.task.id === 0) {
      this.tasks.state.maxId++;
      this.task.id = this.tasks.state.maxId;
      this.newTask = true;
    } else {
      this.newTask = false;
    }

  this.task.items.forEach(el => {
    this.items.push(this.fb.group({
      id: el.id,
      title: [el.title, [Validators.required, Validators.minLength(3)]],
      done: el.done
    }));
  });


  this.taskForm = this.fb.group({
      title: [this.task.title, [Validators.required, Validators.minLength(3)]],
      done: this.task.done,
      items: this.fb.array(this.items)
     });

  this.taskForm.get('title').valueChanges.pipe(debounceTime(500)).subscribe(value => {
      // this.taskForm.get('done').setValue(true);
    });

  }

  get items_() {
    return this.taskForm.get('items') as FormArray;
  }

  addItem() {
      this.tasks.state.maxId++;
      this.items_.push(this.fb.group({
        id: this.tasks.state.maxId,
        title: '',
        done: false
      })
    );
      // to avoid dialog close
      return false;
  }

  deleteItem(id: number) {
    this.deletedItems.push(this.items_.controls[id].value.id);
    this.items_.removeAt(id);
    this.formChanged = true;
    // console.log(this.taskForm);
    return false;
  }


  onCancel() {
    this.formClose.emit(false);
  }

  save() {
    if ((this.taskForm.dirty || this.formChanged) && this.taskForm.valid) {

      this.deletedItems.forEach(el => this.tasks.markDeletedItem(el));

      const t = new Task();
      t.id = this.task.id;
      t.title = this.taskForm.value.title;
      t.done = this.taskForm.value.done;
      t.items = [];

      // tslint:disable-next-line: prefer-for-of
      for (let x = 0; x < this.taskForm.value.items.length; x++) {
        const ti = new TaskItem();
        ti.id = this.taskForm.value.items[x].id;
        ti.title = this.taskForm.value.items[x].title;
        ti.done = this.taskForm.value.items[x].done;
        t.items.push(ti);
      }

      if (this.newTask) {
        this.tasks.add(t);
      } else {
        this.tasks.update(t);
      }
    }

    this.formClose.emit(true);
  }
}
