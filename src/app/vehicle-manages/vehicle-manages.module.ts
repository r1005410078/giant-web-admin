import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonsModule } from '../commons/commons.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { TrackComponent } from './track/track.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const vehicleRoutes:Routes = [
  {path: 'add', component: AddComponent},
  {path: 'list', component: ListComponent},
  {path: 'list/:id', component: DetailComponent},
  {path: 'track/:id', component: TrackComponent}
]
@NgModule({
  imports: [
    CommonModule,
    CommonsModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(vehicleRoutes)
  ],
  declarations: [AddComponent, ListComponent, DetailComponent, TrackComponent]
})
export class VehicleManagesModule { }
