import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTcComponent } from './add-tc/add-tc.component';
import { ListTcComponent } from './list-tc/list-tc.component';
import { Routes, Router, RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonsModule } from '../commons/commons.module';
import { UpdateDetailComponent } from './update-detail/update-detail.component';

const TaoCanRoutes: Routes = [
  {path: "add-tc", component: AddTcComponent},
  {path: "list-tc", component: ListTcComponent},
  {path: "list-tc/:id", component: UpdateDetailComponent},
]

@NgModule({
  imports: [
    CommonsModule,
    CommonModule,
    NgZorroAntdModule,
    RouterModule.forChild(TaoCanRoutes)
  ],
  declarations: [AddTcComponent, ListTcComponent, UpdateDetailComponent]
})
export class TaoCanModule { }
