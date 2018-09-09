import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '../../../../node_modules/@angular/common/http';
import { order_list_api,
  order_updateDepositMoney_api,
  order_createAlipayQrcode_api,
  order_settlement_api,
  order_paySuccess_api } from '../../api';
import { Observable, pipe, of } from '../../../../node_modules/rxjs';
import { switchMap, tap } from '../../../../node_modules/rxjs/operators';
import { NzNotificationService } from '../../../../node_modules/ng-zorro-antd';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-will-rent',
  templateUrl: './will-rent.component.html',
  styleUrls: ['./will-rent.component.css']
})
export class WillRentComponent implements OnInit {

  dataSet = [];
  total = 0;
  pageIndex = 1;
  pageSize = 10;
  loading = false;
  settlementLoading = false;
  isVisible = false;
  payInfo;
  isConfirmLoading = false;

  stationList = this.orderService.stationList;

  codeUrl = null;

  @ViewChild('depositMoney') depositMoney: ElementRef;
  constructor(
    public http: HttpClient,
    public orderService: OrderService,
    public notification: NzNotificationService
  ) { }

  filter(rent_station_id: string): void {
    this.getOrderListApi({rent_station_id});
  }

  onCreateOrder(data) {
    console.log(data);
    this.http.post('/api/system/order/confirm', {
      order_no: data.deposit_order_sn
    })
    .subscribe((ret: any) => {
      this.notification.success('订单', '订单确认成功，告知用户支付租金');
      this.getOrderListApi();
    });
  }

  ngOnInit() {
    this.getOrderListApi();
  }
  handleCancel () {
    this.isVisible = false;
  }
  onCodePay (payInfo) {
    this.payInfo = payInfo;
    this.isVisible = true;
    of(payInfo)
    .pipe(
      tap(() => {
        this.settlementLoading = true;
        this.getOrderListApi();
      }),
      switchMap(() => {
        if (this.payInfo.rent_type === '支付宝') {
          return this.http.post(order_createAlipayQrcode_api, {
            order_no: this.payInfo.rent_order_sn
          })
          .pipe(
            tap((res: any) => {
              if (res && res.data.url) {
                this.codeUrl = res.data.url;
                this.isVisible = this.settlementLoading = false;
              }
            })
          );
        } else if (this.payInfo.rent_type === '微信') {
          // 通知用户去
          this.notification.success('修改押金', '修改押金成功，通知用户在小程序中重新提交订单');
          this.isVisible = this.settlementLoading = false;
        } else {
          return this.http.post(order_paySuccess_api, {
            order_no: this.payInfo.rent_order_sn
          }).pipe(
            tap(res => {
              this.notification.success('订单', '现金订单生成成功');
              this.getOrderListApi();
            })
          );
        }
        return [];
      })
    )
    .subscribe((res: any) => {
      // this.isVisible = this.isConfirmLoading = false;
    });
  }
  handlePayCodeCOk () {
    this.codeUrl = null;
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
      deposit_status: 1,
      page_size: this.pageSize,
      page: this.pageIndex,
      rent_status: 0,
      ...params
    })
    .subscribe((res: any) => {
      this.loading = false;
      this.dataSet = res.data.data;
      this.total = res.data.total;
    });
  }
}
