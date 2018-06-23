import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedPacketListComponent } from './red-packet-list.component';

describe('RedPacketListComponent', () => {
  let component: RedPacketListComponent;
  let fixture: ComponentFixture<RedPacketListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedPacketListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedPacketListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
