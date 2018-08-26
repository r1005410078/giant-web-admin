import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '../../../../node_modules/@angular/common/http';
import { order_list_api, order_updateDepositMoney_api, order_createAlipayQrcode_api, order_settlement_api, order_paySuccess_api } from '../../api';
import { Observable, pipe } from '../../../../node_modules/rxjs';
import { switchMap, tap } from '../../../../node_modules/rxjs/operators';
import { NzNotificationService } from '../../../../node_modules/ng-zorro-antd';

@Component({
  selector: 'app-will-payment',
  templateUrl: './will-payment.component.html',
  styleUrls: ['./will-payment.component.css']
})
export class WillPaymentComponent implements OnInit {
  dataSet = [];
  total = 0;
  pageIndex = 1;
  pageSize = 10;
  loading = false;
  settlementLoading = false;
  isVisible = false;
  payInfo;
  isConfirmLoading = false;

  codeUrl = null;

  @ViewChild('depositMoney') depositMoney: ElementRef;
  constructor(
    public http: HttpClient,
    public notification: NzNotificationService
  ) { }

  ngOnInit() {
    this.getOrderListApi();
  }
  handleCancel () {
    this.isVisible = false;
  }
  handleOk (value) {
    this.http.post(order_updateDepositMoney_api, {
      money: this.depositMoney.nativeElement.value,
      order_sn: this.payInfo.deposit_order_sn
    })
    .pipe(
      tap(() => {
        this.isConfirmLoading = true;
        this.getOrderListApi();
      }),
      switchMap(() => {
        if (this.payInfo.deposit_type === '支付宝') {
          return this.http.post(order_createAlipayQrcode_api, {
            order_no: this.payInfo.deposit_order_sn
          })
          .pipe(
            tap((res: any) => {
              if (res && res.data.url) {
                this.codeUrl = res.data.url;
                this.isVisible = this.isConfirmLoading = false;
              }
            })
          );
        } else if (this.payInfo.deposit_type === '微信') {
          // 通知用户去
          this.notification.success('修改押金', '修改押金成功，通知用户在小程序中重新提交订单');
          this.isVisible = this.isConfirmLoading = false;
        } else {
          return this.http.post(order_paySuccess_api, {
            order_no: this.payInfo.deposit_order_sn
          }).pipe(
            tap(res => {
              this.notification.success('订单', '现金订单生成成功');
              this.isVisible = this.isConfirmLoading = false;
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
  onSettlement (payInfo) {
    this.settlementLoading = true;
    this.http.post(order_settlement_api, {
      order_no: payInfo.deposit_order_sn
    })
    .pipe(
      tap(() => {
        this.isConfirmLoading = true;
        this.getOrderListApi();
      })
    )
    .subscribe((res: any) => {
      this.isConfirmLoading = true;
      this.settlementLoading = false;
      this.notification.success('现金结算', '生成现金订单成功');
    });
  }
  onCodePay (payInfo: any) {
    this.payInfo = payInfo;
    this.isVisible = true;
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
      deposit_status: 0,
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
