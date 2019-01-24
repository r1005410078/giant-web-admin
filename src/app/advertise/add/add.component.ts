import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '../../../../node_modules/@angular/forms';
import { HttpClient } from '../../../../node_modules/@angular/common/http';
import { NzNotificationService } from '../../../../node_modules/ng-zorro-antd';
import { QuillComponent } from '../../commons/quill/quill.component';
import { IllustrationComponent } from '../../commons/illustration/illustration.component';
import { article_detail_api, article_update_api } from '../../api';
import { iif, of, Observable } from '../../../../node_modules/rxjs';
import { map, tap, switchMap } from '../../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  @Input() isHideNav = true;
  @Input() id = null;
  public loading = false;
  public formGroup: FormGroup;

  @ViewChild(QuillComponent)
  public quillComponent: QuillComponent;
  @ViewChild(IllustrationComponent)
  public illustration: IllustrationComponent;


  constructor(
    public fb: FormBuilder,
    public http: HttpClient,
    public notification: NzNotificationService
  ) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      content: [null],
      title: ['轮播图'],
      cover_img: [null],
      type: [4]
    });
    if (this.id) {
      this.http.post(article_detail_api, {
        id: this.id
      })
      .subscribe((result: {ok: boolean, data: any}) => {
        if (result.ok) {
          this.formGroup.patchValue(result.data);
          this.quillComponent.editor.pasteHTML(result.data.content);
        }
      });
    }
  }

  submitForm () {
    // tslint:disable-next-line:forin
    for (const i in this.formGroup.controls) {
      this.formGroup.controls[ i ].markAsDirty();
      this.formGroup.controls[ i ].updateValueAndValidity();
    }
    iif(() => this.formGroup.valid, of(this.formGroup.value))
      .pipe(
        map(f => ({
          ...f,
          route: [],
        })),
        // 更新的时候， 需要id
        tap((parmas: any) => {
          if (this.id) {
            parmas.id = this.id;
          }
        }),
        // 上传图像
        switchMap((parmas: any) => {
          return Observable.create(obser => {
            this.loading = true;
            this.illustration.upload(url => {
              parmas.cover_img = url;
              obser.next(parmas);
            });
          });
        }),
        // 富文本编辑器
        switchMap((parmas: any) => { // 富文本编辑器
          return Observable.create(obser => {
            this.quillComponent.imageb64toUrl(content => {
              parmas.content = content;
              obser.next(parmas);
            });
          });
        }),
         // 保存数据
        switchMap((parmas: any) => {
          return this.http.post(article_update_api, parmas);
        })
      )
      .subscribe({
        next: (data: any) => {
          this.loading = false;
          this.notification.success('成功', '添加成功');
        },
        error: err => {
          this.loading = false;
          this.notification.error('服务的错误', '添加轮播图失败！！');
        }
      });
  }
}
