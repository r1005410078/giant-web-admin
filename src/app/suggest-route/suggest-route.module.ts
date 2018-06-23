import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonsModule } from '../commons/commons.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';

const suggestRoutes: Routes = [
  {path: 'add', component: AddComponent},
  {path: 'list', component: ListComponent},
  {path: 'list/:id', component: DetailComponent}
]

@NgModule({
  imports: [
    CommonModule,
    CommonsModule,
    NgZorroAntdModule,
    RouterModule.forChild(suggestRoutes)
  ],
  declarations: [AddComponent, ListComponent, DetailComponent]
})
export class SuggestRouteModule { }
