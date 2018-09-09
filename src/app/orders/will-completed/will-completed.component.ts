import { Component, OnInit } from '@angular/core';
import { WillCompletedService } from '../services/will-completed.service';
import { order_list_api, order_settlement_api } from '../../api';
import { HttpClient } from '../../../../node_modules/@angular/common/http';
import { NzNotificationService } from '../../../../node_modules/ng-zorro-antd';
import { tap } from '../../../../node_modules/rxjs/operators';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-will-completed',
  templateUrl: './will-completed.component.html',
  styleUrls: ['./will-completed.component.css'],
  providers: [ WillCompletedService ]
})
export class WillCompletedComponent implements OnInit {
  dataSet = [1];
  total = 0;
  pageIndex = 1;
  pageSize = 10;
  loading = false;
  isVisible = false;
  settlementLoading = false;
  stationList = this.orderService.stationList;
  constructor(
    public http: HttpClient,
    public orderService: OrderService,
    public notification: NzNotificationService
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
  onSearch (phone) {
    const p = {};
    if (phone) {
      this.pageIndex = 1;
      p['phone'] = phone;
    }
    this.getOrderListApi(p);
  }
  onSettlement (payInfo) {
    this.settlementLoading = true;
    this.http.post(order_settlement_api, {
      order_no: payInfo.deposit_order_sn
    })
    .pipe(
      tap(() => {
        this.loading = true;
        this.getOrderListApi();
      })
    )
    .subscribe((res: any) => {
      this.loading = true;
      this.settlementLoading = false;
      this.notification.success('结算', '结算成功');
    });
  }
  onPageIndexChange () {
    this.getOrderListApi();
  }
  getOrderListApi (params?) {
    this.loading = true;
    return this.http.post(order_list_api, {
      deposit_status: 1,
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
