import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WillCompletedComponent } from './will-completed.component';

describe('WillCompletedComponent', () => {
  let component: WillCompletedComponent;
  let fixture: ComponentFixture<WillCompletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WillCompletedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WillCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
