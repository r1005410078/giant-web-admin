import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WillRentComponent } from './will-rent.component';

describe('WillRentComponent', () => {
  let component: WillRentComponent;
  let fixture: ComponentFixture<WillRentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WillRentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WillRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
