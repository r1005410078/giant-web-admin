import { NgModule } from '@angular/core';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonsModule } from '../commons/commons.module';

const routers: Routes = [
  {path: 'oreders', loadChildren: '../orders/orders.module#OrdersModule'},
  {path: "tao-can", loadChildren: '../tao-can/tao-can.module#TaoCanModule'},
  {path: "station", loadChildren: '../station/station.module#StationModule'},
  {path: "suggest-route", loadChildren: '../suggest-route/suggest-route.module#SuggestRouteModule'},
  {path: "matters",loadChildren: '../matters/matters.module#MattersModule'}, // 注意事项
  {path: "discover",loadChildren: '../discover/discover.module#DiscoverModule'},
  {path: "vehicle-manages", loadChildren: "../vehicle-manages/vehicle-manages.module#VehicleManagesModule"},
  {path: "user", loadChildren: "../user/user.module#UserModule"},
  {
    path: '',
    redirectTo: '/giant/oreders/app-will-payment(aux:menu)',
    pathMatch: 'full'
  }
]

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    CommonsModule,
    RouterModule.forChild(routers),
    NgZorroAntdModule,
  ],
  providers: [],
})
export class AdminModule {

}
