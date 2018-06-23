import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { Routes, RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CommonsModule } from '../commons/commons.module';

const stationRoutes: Routes = [
  {path: 'list', component: ListComponent},
  {path: 'add', component: AddComponent},
  {path: "list/:id", component: DetailComponent}
]

@NgModule({
  imports: [
    CommonModule,
    CommonsModule,
    NgZorroAntdModule,
    RouterModule.forChild(stationRoutes)
  ],
  declarations: [AddComponent, ListComponent, DetailComponent]
})
export class StationModule { }
