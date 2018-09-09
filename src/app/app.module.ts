import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { AppComponent } from './app.component';
import { NZ_I18N, zh_CN, NgZorroAntdModule } from 'ng-zorro-antd';
import { registerLocaleData, LocationStrategy, HashLocationStrategy } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { RouterModule, Routes, Router } from '@angular/router';
import { UserinfoService } from './userinfo.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './commons/menu/menu.component';
import { CommonsModule } from './commons/commons.module';
import { AuthInterceptorService } from './auth-interceptor.service';
import { QiniuUploadService } from './qiniu-upload.service';
import { BmapService } from './bmap.service';

const routers: Routes = [
  {
    path: 'giant',
    canLoad: [UserinfoService],
    loadChildren: './admin/admin.module#AdminModule'
  },
  {path: 'menu', component: MenuComponent, outlet: 'aux'},
  {
    path: 'login', loadChildren: './login/login.module#LoginModule',
    canActivate: [UserinfoService]
  }
];

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent
  ],
  imports: [
    CommonsModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routers),
    NgZorroAntdModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    BmapService,
    QiniuUploadService,
    NzNotificationService,
    UserinfoService,
    { provide: NZ_I18N, useValue: zh_CN }, { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
