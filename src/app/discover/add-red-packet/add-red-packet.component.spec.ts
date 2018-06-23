import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRedPacketComponent } from './add-red-packet.component';

describe('AddRedPacketComponent', () => {
  let component: AddRedPacketComponent;
  let fixture: ComponentFixture<AddRedPacketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRedPacketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRedPacketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
