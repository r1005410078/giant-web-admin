import { Component, OnInit } from '@angular/core';
import { Article } from '../interface';
import { HttpClient } from '@angular/common/http';
import { article_list_api, article_update_api } from '../../api';
import { switchMap } from '../../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  data: Array<Article> = [];
  constructor(public http: HttpClient) { }

  ngOnInit() {
    this.http.post(article_list_api, {
      'page': 1,
      'page_size': 99,
      'type': 3
    })
    .subscribe((ret: {ok: boolean, data: {total: number, page_size: number, data: Array<Article>}}) => {
      this.data = ret.data.data;
    });
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
              'type': 3
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
