import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from '../../../../node_modules/ng-zorro-antd';
import { article_list_api, article_update_api } from '../../api';
import { HttpClient } from '../../../../node_modules/@angular/common/http';
import { switchMap } from '../../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  data = [];
  constructor(
    public http: HttpClient,
    public notification: NzNotificationService
  ) { }

  ngOnInit() {
    this.http.post(article_list_api, {
      'page': 1,
      'page_size': 99,
      'type': 2
    })
    .subscribe({
      next: (ret: any) => {
        this.data = ret.data.data;
      },
      error: err => {
        this.notification.error('服务的错误', '获取路线失败！');
      }
    });
  }

  onZhiDing (item) {
    this.http.post(article_update_api, {...item, order_weight: 1})
      .subscribe(() => {
        this.ngOnInit();
      })
  }

  onDelete (item) {
    item.status = 0;
    this.http.post(article_update_api, item)
      .pipe(
        switchMap((res: any) => {
          if (res.ok) {
            return this.http.post(article_list_api, {
              'page': 1,
              'page_size': 99,
              'type': 2
            });
          }
        })
      )
      .subscribe((result: any) => {
        if (result.ok) {
          this.data = result.data.data;
        }
      });
  }
}
