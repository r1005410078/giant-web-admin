import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { RouterModule, Routes } from '@angular/router';
import { CommonsModule } from './commons/commons.module';
import { BmapService } from './bmap.service';

const routers: Routes = [
  {path: 'oreders', loadChildren: './orders/orders.module#OrdersModule'},
  {path: "tao-can", loadChildren: './tao-can/tao-can.module#TaoCanModule'},
  {path: "station", loadChildren: './station/station.module#StationModule'},
  {path: "suggest-route", loadChildren: './suggest-route/suggest-route.module#SuggestRouteModule'},
  {path: "matters",loadChildren: './matters/matters.module#MattersModule'}, // 注意事项
  {path: "discover",loadChildren: './discover/discover.module#DiscoverModule'},
  {path: "vehicle-manages", loadChildren: "./vehicle-manages/vehicle-manages.module#VehicleManagesModule"},
  {path: "user", loadChildren: "./user/user.module#UserModule"},
  { path: '',
    redirectTo: '/oreders/app-will-payment',
    pathMatch: 'full'
  },
]

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routers),
    NgZorroAntdModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }, BmapService],
  bootstrap: [AppComponent]
})
export class AppModule { }
