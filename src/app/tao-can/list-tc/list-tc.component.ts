import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzNotificationService } from 'ng-zorro-antd';
import { ComboService } from '../combo.service';
import { HttpClient } from '../../../../node_modules/@angular/common/http';

@Component({
  selector: 'app-list-tc',
  templateUrl: './list-tc.component.html',
  styleUrls: ['./list-tc.component.css']
})
export class ListTcComponent implements OnInit {
  private loading = true; // bug
  private data = [];

  isVisible = false;
  total = 0;
  pageIndex = 1;
  pageSize = 10;
  imgSrc = '';

  constructor(
    private http: HttpClient,
    private comboService: ComboService,
    private msg: NzMessageService,
    private notification: NzNotificationService) { }

  showModal(imgSrc): void {
    this.imgSrc = imgSrc;
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  ngOnInit() {
    console.log(1111);
    this.getData();
  }

  getData(page = this.pageIndex, page_size = this.pageSize): void {
    this.comboService.getList({page, page_size}).subscribe({
      next: (res: any) => {
        // console.log(res)
        this.data = res.data.data;
        this.total = res.data.total;
        this.loading = false;
      },
      error: err => {
        this.loading = false;
        this.notification.error('服务的错误', '获取套餐列表失败！！');
      }
    });
  }

  onDelete (item) {
    item.status = 0;
    this.http.post('/api/system/combo/saveOrUpdate', item)
      .subscribe((result: any) => {
        if (result.ok) {
          this.getData();
        }
      });
  }

}
