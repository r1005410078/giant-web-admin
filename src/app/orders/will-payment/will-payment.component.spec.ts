import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WillPaymentComponent } from './will-payment.component';

describe('WillPaymentComponent', () => {
  let component: WillPaymentComponent;
  let fixture: ComponentFixture<WillPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WillPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WillPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
