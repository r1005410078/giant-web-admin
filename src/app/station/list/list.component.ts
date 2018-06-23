import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  data = new Array(5).fill({}).map((i, index) => {
    return {
      title: `驿站名称 ${index}`,
      description: '宁波, 钱塘湖',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content: '驿站简介 车主身份ID，扫描QR绑定您的爱车享受更贴心的服务车主身份ID，扫描QR绑定您的爱车'
    };
  });
  constructor() { }

  ngOnInit() {
  }

}
