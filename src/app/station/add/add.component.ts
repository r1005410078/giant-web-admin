import { Component, OnInit, ViewChild, ElementRef, AfterContentInit, Input, OnDestroy } from '@angular/core';
import { BmapService } from '../../bmap.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Station } from '../interface';
import { QuillComponent } from '../../commons/quill/quill.component';
import { iif, of, Observable } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { NzNotificationService } from 'ng-zorro-antd';
import { IllustrationComponent } from '../../commons/illustration/illustration.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit, AfterContentInit, OnDestroy {

  @Input() id = null;
  @Input() isHideNav = true;

  @ViewChild(QuillComponent)
  private quillComponent: QuillComponent;
  @ViewChild(IllustrationComponent)
  private illustration: IllustrationComponent;

  private loading = false;
  private formGroup: FormGroup;

  constructor(
    private http: HttpClient,
    private bmapService: BmapService,
    private fb: FormBuilder,
    private notification: NzNotificationService
  ) {

  }

  get address () {
    return this.bmapService.address.address ? this.bmapService.address : this.formGroup.get('address').value;
  }

  onEideBMap() {
    this.bmapService.toggleState.next(this.address);
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
          address: this.address,
        })),
        // 更新的时候， 需要id
        tap((parmas: any) => {
          if (this.id) {
            parmas.id = this.id;
          }
          console.log(parmas);
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
          return this.http.post('/api/system/station/saveOrUpdate', parmas);
        })
      )
      .subscribe({
        next: (data: any) => {
          this.loading = false;
          this.notification.success('驿站', '添加驿站成功！！');
        },
        error: err => {
          this.loading = false;
          this.notification.error('服务的错误', '添加驿站失败！！');
        }
      });
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      name: [null, [Validators.required]],
      content: [null],
      cover_img: [null],
      address: [this.bmapService.address]
    });
    if (this.id) {
      this.http.post('/api/system/station/detail', {
        id: this.id
      })
      .subscribe((result: {ok: boolean, data: Station}) => {
        if (result.ok) {
          this.formGroup.patchValue(result.data);
          this.quillComponent.editor.pasteHTML(result.data.content);
        }
      });
    }
  }

  ngAfterContentInit () {

  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.bmapService.clear();
  }
}
