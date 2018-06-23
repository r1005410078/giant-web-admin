import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonsModule } from '../commons/commons.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';

const userRoutes:Routes = [
  {path: "list", component: ListComponent}
]

@NgModule({
  imports: [
    CommonModule,
    CommonsModule,
    NgZorroAntdModule,
    RouterModule.forChild(userRoutes)
  ],
  declarations: [ListComponent]
})
export class UserModule { }
