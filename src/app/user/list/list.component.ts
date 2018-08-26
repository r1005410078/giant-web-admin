import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NzNotificationService } from '../../../../node_modules/ng-zorro-antd';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public data = [];
  public total = 0;
  public pageIndex = 1;
  public pageSize = 10;
  isVisible = false;
  allChecked = false;
  indeterminate = false;
  displayData = [];

  get displayDataChecked () {
    return this.displayData.filter(data => data.checked).map(d => d.id);
  }

  constructor(public http: HttpClient, public notification: NzNotificationService) {}

  ngOnInit () {
    this.updateData();
  }

  updateData () {
    this.http.post('/api/system/user/list', {
      'page': this.pageIndex,
      'page_size': this.pageSize
    })
    .subscribe((ret: any) => {
      this.data = ret.data.data.map(item => {
        item.checked = false;
        return item;
      });
      this.total = ret.data.total;
    });
  }

  currentPageDataChange($event: Array<{ name: string; age: number; address: string; checked: boolean; disabled: boolean; }>): void {
    this.displayData = $event;
    this.refreshStatus();
  }

  refreshStatus(): void {
    const allChecked = this.displayData.filter(value => !value.disabled).every(value => value.checked === true);
    const allUnChecked = this.displayData.filter(value => !value.disabled).every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
  }

  checkAll(value: boolean): void {
    this.displayData.forEach(data => {
      if (!data.disabled) {
        data.checked = value;
      }
    });
    this.refreshStatus();
  }

  sendsXX () {
    this.http.post('/api/system/user/sms', {
      'id_list': this.displayDataChecked
    })
    .subscribe((ret: any) => {
      this.notification.success('短信', '短信发送成功');
    });
  }

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
}
