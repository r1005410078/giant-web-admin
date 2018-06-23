import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedPacketDetailComponent } from './red-packet-detail.component';

describe('RedPacketDetailComponent', () => {
  let component: RedPacketDetailComponent;
  let fixture: ComponentFixture<RedPacketDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedPacketDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedPacketDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
