import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTcComponent } from './list-tc.component';

describe('ListTcComponent', () => {
  let component: ListTcComponent;
  let fixture: ComponentFixture<ListTcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
