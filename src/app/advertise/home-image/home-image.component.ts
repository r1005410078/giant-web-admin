import { Component, OnInit, ViewChild } from '@angular/core';
import { IllustrationComponent } from 'src/app/commons/illustration/illustration.component';
import { HttpClient } from '@angular/common/http';
import { advert_saveOrUpdate, get_advert_saveOrUpdate } from 'src/app/api';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-home-image',
  templateUrl: './home-image.component.html',
  styleUrls: ['./home-image.component.css']
})
export class HomeImageComponent implements OnInit {
  public value = {w: 441, h: 736};
  public list = [
    {label: 'iphone6/7/8', value: {w: 375, h: 667}},
    {label: 'iphone6/7/8 Plus', value: {w: 441, h: 736}},
    {label: 'iphoneX', value: {w: 375, h: 812}},
    {label: 'iphoneXS Max', value: {w: 414, h: 896}}
  ];
  @ViewChild(IllustrationComponent)
  public illustration: IllustrationComponent;
  constructor(public http: HttpClient, public notification: NzNotificationService) { }

  public imgsrc = '';
  public id = '';
  public loading = false;

  ngOnInit() {
    this.http.post(get_advert_saveOrUpdate, {page: 1, page_size: 99})
      .subscribe((ret: any) => {
        this.imgsrc = ret.data.data[0].img_url
        this.id = ret.data.data[0].id
      })
  }
  onSave () {
    this.loading = true
    this.illustration.upload(url => {
      this.http.post(advert_saveOrUpdate, {
        id: this.id,
        img_url: url
      })
      .subscribe(ret => {
        this.loading = false
        this.notification.success('成功', '更新成功');
      })
    });
  }
}
