import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Station, StationList } from '../interface';
import { DomSanitizer } from '@angular/platform-browser';
import { pipe } from '../../../../node_modules/rxjs';
import { switchMap } from '../../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  data = Array<Station>();
  constructor(public http: HttpClient, public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.http.post('/api/system/station/list', {
      'page': 1,
      'page_size': 100
    })
    .subscribe((result: StationList) => {
      if (result.ok) {
        this.data = result.data.data;
      }
    });
  }

  onDelete (item) {
    item.status = 0;
    this.http.post('/api/system/station/saveOrUpdate', item)
      .pipe(
        switchMap((res: any) => {
          if (res.ok) {
            return this.http.post('/api/system/station/list', {
              'page': 1,
              'page_size': 100
            });
          }
        })
      )
      .subscribe((result: StationList) => {
        if (result.ok) {
          this.data = result.data.data;
        }
      });
  }
}
