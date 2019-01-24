import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QqmapComponent } from './qqmap.component';

describe('QqmapComponent', () => {
  let component: QqmapComponent;
  let fixture: ComponentFixture<QqmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QqmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QqmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
