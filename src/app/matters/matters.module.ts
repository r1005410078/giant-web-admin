import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { DetailComponent } from './detail/detail.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonsModule } from '../commons/commons.module';

const mattersRoutes:Routes = [
  {path: 'add', component: AddComponent},
  {path: 'list', component: ListComponent},
  {path: 'list/:id', component: DetailComponent}
]

@NgModule({
  imports: [
    CommonModule,
    CommonsModule,
    NgZorroAntdModule,
    RouterModule.forChild(mattersRoutes)
  ],
  declarations: [ListComponent, AddComponent, DetailComponent]
})
export class MattersModule { }
