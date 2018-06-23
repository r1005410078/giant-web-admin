import { NgModule } from '@angular/core';
import { WillCompletedComponent } from './will-completed/will-completed.component';
import { RouterModule, Routes  } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { WillPaymentComponent } from './will-payment/will-payment.component';
import { CompletedComponent } from './completed/completed.component';

const orederRouters: Routes  = [
  {
    path: 'app-will-completed', component: WillCompletedComponent
  }, {
    path: 'app-will-payment', component: WillPaymentComponent
  }, {
    path: 'app-completed', component: CompletedComponent
  }
]

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(orederRouters),
    NgZorroAntdModule
  ],
  declarations: [WillCompletedComponent, HeaderComponent, WillPaymentComponent, CompletedComponent]
})
export class OrdersModule { }
