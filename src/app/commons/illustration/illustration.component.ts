import { Component, OnInit } from '@angular/core';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { HttpRequest, HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-illustration',
  templateUrl: './illustration.component.html',
  styleUrls: ['./illustration.component.css']
})
export class IllustrationComponent {
  private uptoken = "SiKapEAp33fGNhZqG1-SAe1TOdd-gzfHxGtk93Au";
  private percentDone;
  private progress;
  private loading = false;
  private avatarUrl: string = "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=622769075,4000555572&fm=58";

  constructor(private msg: NzMessageService, private http: HttpClient) {}

  private getBase64(img: File, callback: (img: {}) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    console.log(1111111, img)
    // const formData = new FormData();
    // formData.append('file', img);
    // formData.append('key', img.name);
    // formData.append('token', this.uptoken);

    // const request = new HttpRequest('POST',  this.upHost,  formData, {
    //   reportProgress: true
    // });

    // this.http.request(request)
    //     .retry(3)
    //     .subscribe(
    //         event => {
    //           if (event.type === HttpEventType.UploadProgress) {
    //             this.percentDone = Math.round(100 * event.loaded / event.total);
    //             this.progress = `File is ${this.percentDone}% uploaded.`;
    //           } else if (event instanceof HttpResponse) {
    //             this.progress = `${event.body['key']} is uploaded`;
    //             console.log(this.progress)
    //           }
    //         });
    reader.readAsDataURL(img);
  }

  handleChange(info: { file: UploadFile }): void {
    if (info.file.status === 'uploading') {
      this.loading = true;
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, (img: string) => {
        this.loading = false;
        this.avatarUrl = img;
      });
    }
  }

}
