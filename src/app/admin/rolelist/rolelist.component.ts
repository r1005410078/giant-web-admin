import { Component, OnInit } from '@angular/core';
import { HttpClient } from '../../../../node_modules/@angular/common/http';

@Component({
  selector: 'app-rolelist',
  templateUrl: './rolelist.component.html',
  styleUrls: ['./rolelist.component.css']
})
export class RolelistComponent implements OnInit {
  loading = false;
  data: any = [];
  total = 0;
  pageIndex = 1;
  pageSize = 10;

  constructor(public http: HttpClient) { }

  ngOnInit() {
   this.getData();
  }
  getData () {
    this.loading = true;
    this.http.post('/api/system/admin/list', {
      'page': this.pageIndex,
      'page_size': this.pageSize
    })
    .subscribe((ret: any) => {
      this.loading = false;
      this.total = ret.data.total;
      this.data = ret.data.data;
    });
  }
  onDelete (item) {
    item.status = 0;
    this.http.post('/api/system/admin/detail', item)
      .subscribe((result: any) => {
        if (result.ok) {
          this.getData();
        }
      });
  }
}
