import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterbyComponent } from './filterby.component';

describe('FilterbyComponent', () => {
  let component: FilterbyComponent;
  let fixture: ComponentFixture<FilterbyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterbyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
