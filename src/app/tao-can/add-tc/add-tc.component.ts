import { Component, OnInit, AfterViewInit, Input } from '@angular/core';


@Component({
  selector: 'app-add-tc',
  templateUrl: './add-tc.component.html',
  styleUrls: ['./add-tc.component.css']
})
export class AddTcComponent implements OnInit {
  @Input() isHideNav = true
  public dataModel
  // 初始化值
  public editorContent = "";
  // 配置编辑器提醒文字
  public editorConfig = {
    placeholder: "输入公告内容，支持html"
  };

  constructor() { }

  ngOnInit() {
  }

  // 触发事件 html标记语言， text文本
  onContentChanged({ html, text }) {
    console.log(html, text);
  }

}
