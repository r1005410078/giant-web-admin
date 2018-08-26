import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {of} from 'rxjs';
import { Router } from '@angular/router';
import { UserinfoService } from './userinfo.service';
import { NzNotificationService } from 'ng-zorro-antd';


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(public router: Router, public userinfo: UserinfoService, public notification: NzNotificationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req.clone()).pipe(
      map((event) => {
        if (event instanceof HttpResponse) {
          // console.error('HttpResponse error')
        }
        return event;
      }),
      catchError(event => {
        if (event.status === 401) {
          this.userinfo.logout();
          this.notification.error('登陆', '登陆已失效, 请重新登陆');
        }
        if (event.status === 400) {
          this.notification.error('错误', event.error.error_msg);
        }
        return of(event.error);
      })
    );
  }
}
