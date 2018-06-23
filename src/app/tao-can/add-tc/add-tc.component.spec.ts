import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTcComponent } from './add-tc.component';

describe('AddTcComponent', () => {
  let component: AddTcComponent;
  let fixture: ComponentFixture<AddTcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
