import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { AddRedPacketComponent } from './add-red-packet/add-red-packet.component';
import { RedPacketListComponent } from './red-packet-list/red-packet-list.component';
import { DetailComponent } from './detail/detail.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonsModule } from '../commons/commons.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RedPacketDetailComponent } from './red-packet-detail/red-packet-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const discoverRoutes: Routes = [
  {path: 'add', component: AddComponent},
  {path: 'list', component: ListComponent},
  {path: 'list/:id', component: DetailComponent},
  {path: 'add-red-packet', component: AddRedPacketComponent},
  {path: 'red-packet-list', component: RedPacketListComponent},
  {path: 'red-packet-list/:id', component: RedPacketDetailComponent}
]

@NgModule({
  imports: [
    CommonModule,
    CommonsModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(discoverRoutes)
  ],
  declarations: [AddComponent, ListComponent, AddRedPacketComponent, RedPacketListComponent, DetailComponent, RedPacketDetailComponent]
})
export class DiscoverModule { }
