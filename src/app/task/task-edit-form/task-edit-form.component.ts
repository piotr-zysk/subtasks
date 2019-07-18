import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../models/task';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { DataService } from '../services/data.service';
import { EntityState } from '../models/entitystate';
import { TaskItem } from '../models/taskitem';

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
  formChanged = false;

  ngOnInit() {


  this.task.items.forEach(el => {
    this.items.push(this.fb.group({
      id: el.id,
      title: el.title,
      done: el.done
    }));

  });


  this.taskForm = this.fb.group({
      title: this.task.title,
      done: this.task.done,
      items: this.fb.array(this.items)
     });

  }

  get items_() {
    return this.taskForm.get('items') as FormArray;
  }

  addItem() {
      this.items_.push(this.fb.group({
        id: 0,
        title: '',
        done: false
      })
    );
      // to avoid dialog close
      return false;
  }

  deleteItem(id: number) {
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
      const t = new Task();
      t.id = this.taskForm.value.id;
      t.title = this.taskForm.value.title;
      t.done = this.taskForm.value.done;
      t.items = [];

      // console.log(this.taskForm.value.items.length);
      // tslint:disable-next-line: prefer-for-of
      for (let x = 0; x < this.taskForm.value.items.length; x++) {
        const ti = new TaskItem();
        ti.id = this.taskForm.value.items[x].id;
        ti.title = this.taskForm.value.items[x].title;
        ti.done = this.taskForm.value.items[x].done;
        t.items.push(ti);
      }

      if (t.id > 0) {
        this.tasks.entities[this.task.id] = t;
      } else { // new Task

        // duze uproszczenie / workaround, docelowo nowe ID powinno byc nadane przez serwer bazy danych

        const newId = Math.max.apply(null, this.tasks.ids) + 1;
        t.id = newId;

        this.tasks.entities[newId] = t;
        this.tasks.ids.push(newId);
      }
      // console.log(t);
      // console.log(this.tasks.entities[this.task.id] );

      // this.tasks.entities[this.task.id].title = this.taskForm.value.title;
      // this.tasks.entities[this.task.id].done = this.taskForm.value.done;
      // console.log(this.taskForm);
    }

    this.formClose.emit(false);
  }
}
