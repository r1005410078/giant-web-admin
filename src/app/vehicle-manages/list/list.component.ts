import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bike } from '../interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  total = 0;
  pageIndex = 1;
  pageSize = 10;
  value = '';
  data: Array<Bike> = [];
  seachData: Array<Bike> = null;
  downloadUrl = '';
  constructor(public http: HttpClient) { }

  onClick () {
    this.seachData = this.data.filter(d => d.bike_no.indexOf(this.value) > -1);
  }

  ngOnInit() {
    this.getData();
    this.http.post('/api/system/bike/batchQrcode', {})
    .subscribe((ret: any) => {
      this.downloadUrl = ret.data.file_url;
    });
  }

  getData () {
    this.http.post('/api/system/bike/list', {
      page: this.pageIndex,
      page_size: this.pageSize
    })
    .subscribe((ret: {ok: boolean, data: {total: number, data: Array<Bike>}}) => {
      this.total = ret.data.total;
      this.data = ret.data.data;
    });
  }

  onDelete (item) {
    item.status = 0;
    this.http.post('/api/system/bike/saveOrUpdate', item)
      .subscribe((result: any) => {
        if (result.ok) {
          this.getData();
        }
      });
  }

}
