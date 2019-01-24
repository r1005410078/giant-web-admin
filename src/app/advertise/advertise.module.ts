import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RotationChartComponent } from './rotation-chart/rotation-chart.component';
import { HomeImageComponent } from './home-image/home-image.component';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { CommonsModule } from '../commons/commons.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailComponent } from './detail/detail.component';

const advertiseRouters: Routes  = [
  {
    path: 'home-image', component: HomeImageComponent
  }, {
    path: 'rotation-chart-list', component: ListComponent
  }, {
    path: 'rotation-chart-add', component: AddComponent
  }
];

@NgModule({
  exports: [
    RouterModule
  ],
  providers: [

  ],
  imports: [
    CommonModule,
    CommonsModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(advertiseRouters),
  ],
  declarations: [RotationChartComponent, HomeImageComponent, ListComponent, AddComponent, DetailComponent]
})
export class AdvertiseModule { }
