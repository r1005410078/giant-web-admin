import { Component, OnInit, Input, Output } from '@angular/core';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { HttpRequest, HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { QiniuUploadService } from '../../qiniu-upload.service';
import { Subject, Observable, of, pipe } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-illustration',
  templateUrl: './illustration.component.html',
  styleUrls: ['./illustration.component.css']
})
export class IllustrationComponent implements OnInit {
  @Input()
  public uploadImgMessage = '建议(133*133)像素';
  @Input()
  public uploadImg: string = null;
  public loading = false;
  public uploadSubject = new Subject<string>();

  constructor(public msg: NzMessageService, public http: HttpClient, public qiniuService: QiniuUploadService) {}

  ngOnInit () {
    this.uploadSubject.lift;
  }

  public getBase64(img: File, callback: (img: {}) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  beforeUpload = (file, fileList) => {

    this.uploadImg = null;
    return true;
  }

  handleChange(info: { file: UploadFile }): void {
    this.getBase64(info.file.originFileObj, (img: string) => {
      this.loading = false;
      this.uploadImg = img;
      this.uploadSubject.next(this.uploadImg);
    });
    // if (info.file.status === 'uploading') {
    //   this.loading = true;
    //   return;
    // }
    // if (info.file.status === 'done') {

    // }
  }

  upload (next) {
    Observable.create(obser => {
      if (this.uploadImg) {
        obser.next(this.uploadImg);
      } else {
        this.uploadSubject.subscribe(b64 => obser.next(b64));
      }
    })
    .pipe(
      switchMap((b64: string) => {
        if (b64.indexOf('data:') > -1) {
          return this.qiniuService.upload([b64]);
        }
        return [b64];
      })
    )
    .subscribe(next);
  }
}
