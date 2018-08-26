import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap } from '../../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-red-packet-list',
  templateUrl: './red-packet-list.component.html',
  styleUrls: ['./red-packet-list.component.css']
})
export class RedPacketListComponent implements OnInit {
  loading = false;
  data = [];
  total = 0;
  pageIndex = 1;
  pageSize = 10;
  constructor(public http: HttpClient) { }

  ngOnInit() {
    this.loadData();
  }

  loadData () {
    this.loading = true;
    this.http.post('/api/system/redpacket/list', {
      page: this.pageIndex,
      page_size: this.pageSize
    })
    .subscribe((ret: any) => {
      this.loading = false;
      this.total = ret.data.total;
      this.data = ret.data.data;
    });
  }

  onDelete (item) {
    item.status = 0;
    this.http.post('/api/system/redpacket/saveOrUpdate', item)
      .pipe(
        switchMap((res: any) => {
          if (res.ok) {
            return this.http.post('/api/system/redpacket/list', {
              page: this.pageIndex,
              page_size: this.pageSize
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
