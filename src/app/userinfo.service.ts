import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd';
import { CanLoad, Router, Route, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import * as Cookies from 'js-cookie';

export class Userinfo {
  constructor(
    public create_time: number,
    public id: number,
    public nickname: string,
    public openid: string,
    public phone: string,
    public real_name: string,
    public update_time: string
  ) {

  }
}

@Injectable({
  providedIn: 'root'
})
export class UserinfoService implements CanLoad, CanActivate {
  private _info: Userinfo = null;
  /**
   * 获取用户信息
   */
  public get info (): Userinfo {
    if (!this._info && this.cookie.get('token')) {
      this.getUserInfo();
    }
    return this._info;
  }
  /**
   * 读取cookie
   */
  public get cookie (): Cookies.CookiesStatic {
    return Cookies;
  }
  constructor(
    private http: HttpClient,
    private notification: NzNotificationService,
    private router: Router) {}
  /**
   * 保存用户信息
   * @param u
   */
  getUserInfo () {
    if (this.cookie.get('token')) {
      return this.http.post('/system/user/detail', {id: this.cookie.get('token')})
        .subscribe({
          next: (u: Userinfo) => {
            this._info = new Userinfo(
              u.create_time,
              u.id,
              u.nickname,
              u.openid,
              u.phone,
              u.real_name,
              u.update_time,
            );
          },
          error: (err: any) => {
            this.notification.error('服务的错误', '获取用户信息失败！！');
          }
        });
    }
  }

  canLoad(route?: Route): boolean {
    if (route.path === '') {
      return true;
    }
    if (this.cookie.get('token')) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.cookie.get('token')) {
      this.router.navigate(['/giant']);
      return false;
    }
    return true;
  }

  logout () {
    this.cookie.remove('token');
    this.router.navigateByUrl('/login');
  }
}
