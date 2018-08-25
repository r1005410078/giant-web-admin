import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article } from '../interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuillComponent } from '../../commons/quill/quill.component';
import { IllustrationComponent } from '../../commons/illustration/illustration.component';
import { iif, of, Observable } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { NzNotificationService } from 'ng-zorro-antd';
import { article_update_api } from '../../api';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  @Input() id = null;
  @Input() isHideNav = true;

  @ViewChild(QuillComponent)
  private quillComponent: QuillComponent;

  @ViewChild(IllustrationComponent)
  private illustration: IllustrationComponent;


  private loading = false;
  private validateForm: FormGroup;
  constructor(private http: HttpClient, private fb: FormBuilder, private notification: NzNotificationService) { }

  ngOnInit() {

    this.validateForm = this.fb.group({
      content: '',
      cover_img: '',
      type: [3],
      title: ['', [Validators.required]],
    });

    if (this.id) {
      this.http.post('/api/system/article/detail', {
        id: this.id
      })
      .subscribe((ret: {data: Article}) => {
        this.validateForm.patchValue(ret.data);
        this.quillComponent.editor.pasteHTML(ret.data.content);
      });
    }
  }

  submitForm () {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
    iif(() => this.validateForm.valid, of(this.validateForm.value)).pipe(
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
      switchMap(parmas => {
        return this.http.post(article_update_api, parmas);
      }))
      .subscribe({
        next: (data: any) => {
          this.loading = false;
          this.notification.success('广告', '保存成功！');
        },
        error: err => {
          this.loading = false;
          this.notification.error('服务的错误', '添加套餐失败！！');
        }
      });

  }

}
