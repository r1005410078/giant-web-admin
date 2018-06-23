import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  data = new Array(5).fill({}).map((i, index) => {
    return {
      title: `大湖畔路线 ${index}`,
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      description: '宁波驿站A->大湖畔->钱塘湖->宁波驿站B',
      content: `车主身份ID，扫描QR绑定您的爱车
      享受更贴心的服务车主身份ID，扫描QR绑定您的爱车
      享受更贴心的服务车主身份ID，扫描QR绑定您的爱车
      享受更贴心的服务`
    };
  });
  constructor() { }

  ngOnInit() {
  }

}
