import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { BmapService } from '../../bmap.service';
import { FormBuilder, FormGroup, Validators } from '../../../../node_modules/@angular/forms';
import { NzNotificationService } from '../../../../node_modules/ng-zorro-antd';
import { iif, of, Observable } from '../../../../node_modules/rxjs';
import { map, tap, switchMap } from '../../../../node_modules/rxjs/operators';
import { QuillComponent } from '../../commons/quill/quill.component';
import { IllustrationComponent } from '../../commons/illustration/illustration.component';
import { HttpClient } from '../../../../node_modules/@angular/common/http';
import { article_update_api, article_detail_api } from '../../api';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit, OnDestroy {
  @Input() isHideNav = true;
  @Input() id = null;
  public loading = false;
  public formGroup: FormGroup;

  constructor(
    public bmapService: BmapService,
    public fb: FormBuilder,
    public http: HttpClient,
    public notification: NzNotificationService
  ) {

  }

  get address () {
    return {
      lng: null,
      lat: null,
      address: this.bmapService.routeAddress.moreResultsUrl
      || (this.formGroup && this.formGroup.get('route').value[0] ? this.formGroup.get('route').value[0].address : '')
    };
  }

  @ViewChild(QuillComponent)
  public quillComponent: QuillComponent;
  @ViewChild(IllustrationComponent)
  public illustration: IllustrationComponent;

  ngOnInit() {
    this.formGroup = this.fb.group({
      title: [null, [Validators.required]],
      content: [null],
      cover_img: [null],
      route: [this.address],
      type: [1]
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
          route: [this.address],
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
          this.notification.success('推荐路线', '添加路线成功！！');
          this.loading = false;
        },
        error: err => {
          this.loading = false;
          this.notification.error('服务的错误', '添加路线失败！！');
        }
      });
  }

  onEideBMap () {
    this.bmapService.toggleStateRouteMap.next(this.address);
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.bmapService.clear();
  }

}
