import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzNotificationService } from 'ng-zorro-antd';
import { ComboService } from '../combo.service';

@Component({
  selector: 'app-list-tc',
  templateUrl: './list-tc.component.html',
  styleUrls: ['./list-tc.component.css']
})
export class ListTcComponent implements OnInit {
  private loading = true; // bug
  private data = [];

  isVisible = false;

  constructor(private comboService: ComboService, private msg: NzMessageService, private notification: NzNotificationService) { }

  showModal(): void {
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
    this.getData()
  }

  getData(page = 1, page_size = 10): void {
    this.comboService.getList({page, page_size}).subscribe({
      next: (res: any) => {
        this.data = res.results;
        this.loading = false;
      },
      error: err => {
        this.loading = false
        this.notification.error("服务的错误", "获取套餐列表失败！！")
      }
    })
  }

}
