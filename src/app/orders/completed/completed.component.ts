import { Component, OnInit } from '@angular/core';
import { QiniuUploadService } from '../../qiniu-upload.service';
import { order_list_api, order_exportOrder_api } from '../../api';
import { HttpClient } from '../../../../node_modules/@angular/common/http';
import { OrderService } from '../services/order.service';


@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.css']
})
export class CompletedComponent implements OnInit {

  dataSet = [1];
  total = 0;
  pageIndex = 1;
  pageSize = 10;
  loading = false;
  stationList = this.orderService.stationList;
  constructor(
    public http: HttpClient,
    public orderService: OrderService
  ) { }

  filter(rent_station_id: string): void {
    this.getOrderListApi({rent_station_id});
  }

  returnFilter(return_station_id: string): void {
    this.getOrderListApi({return_station_id});
  }


  ngOnInit() {
    this.getOrderListApi();
  }
  onExcel () {
    this.http.post(order_exportOrder_api, {
      deposit_status: 2,
      page_size: this.pageSize,
      page: this.pageIndex,
      rent_status: 1
    })
    .subscribe((res: any) => {
      window.open(res.data.file_url);
    });
  }
  onSearch (phone) {
    const p = {};
    if (phone) {
      this.pageIndex = 1;
      p['phone'] = phone;
    }
    this.getOrderListApi(p);
  }
  onPageIndexChange () {
    this.getOrderListApi();
  }
  getOrderListApi (params?) {
    this.loading = true;
    return this.http.post(order_list_api, {
      deposit_status: 2,
      page_size: this.pageSize,
      page: this.pageIndex,
      rent_status: 1,
      ...params
    })
    .subscribe((res: any) => {
      this.loading = false;
      this.dataSet = res.data.data;
      this.total = res.data.total;
    });
  }
}
