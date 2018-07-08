import { Component, OnInit, Input } from '@angular/core';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { HttpRequest, HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-illustration',
  templateUrl: './illustration.component.html',
  styleUrls: ['./illustration.component.css']
})
export class IllustrationComponent {

  public loading = false;
  @Input()
  private avatarUrl: string = "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=622769075,4000555572&fm=58";

  constructor(private msg: NzMessageService, private http: HttpClient) {}

  private getBase64(img: File, callback: (img: {}) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  handleChange(info: { file: UploadFile }): void {
    if (info.file.status === 'uploading') {
      this.loading = true;
      return;
    }
    if (info.file.status === 'done') {
      this.getBase64(info.file.originFileObj, (img: string) => {
        this.loading = false;
        console.log(1111, img)
        this.avatarUrl = img;
      });
    }
  }

}
