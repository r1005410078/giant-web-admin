import { NgModule } from '@angular/core';
import { WillCompletedComponent } from './will-completed/will-completed.component';
import { RouterModule, Routes  } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { WillPaymentComponent } from './will-payment/will-payment.component';
import { CompletedComponent } from './completed/completed.component';
import { FormsModule, ReactiveFormsModule } from '../../../node_modules/@angular/forms';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { WillRentComponent } from './will-rent/will-rent.component';

const orederRouters: Routes  = [
  {
    path: 'app-will-completed', component: WillCompletedComponent
  }, {
    path: 'app-will-payment', component: WillPaymentComponent
  }, {
    path: 'app-will-rent', component: WillRentComponent
  }, {
    path: 'app-completed', component: CompletedComponent
  }
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(orederRouters),
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    NgxQRCodeModule
  ],
  declarations: [WillCompletedComponent, HeaderComponent, WillPaymentComponent, CompletedComponent, WillRentComponent]
})
export class OrdersModule { }
