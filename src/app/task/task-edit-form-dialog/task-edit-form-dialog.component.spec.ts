import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskEditFormDialogComponent } from './task-edit-form-dialog.component';

describe('TaskEditFormDialogComponent', () => {
  let component: TaskEditFormDialogComponent;
  let fixture: ComponentFixture<TaskEditFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskEditFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskEditFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
