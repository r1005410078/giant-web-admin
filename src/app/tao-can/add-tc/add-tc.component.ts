import { Component, OnInit, AfterViewInit, Input, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';
import { QuillComponent } from '../../commons/quill/quill.component';
import { ComboService } from '../combo.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { IllustrationComponent } from '../../commons/illustration/illustration.component';
import { of, Observable, iif } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';
import { SaveRequestParams } from '../model';

@Component({
  selector: 'app-add-tc',
  templateUrl: './add-tc.component.html',
  styleUrls: ['./add-tc.component.css'],
  providers: [FormBuilder]
})
export class AddTcComponent implements OnInit {
  public validateForm: FormGroup;
  public interval: FormArray;

  @Input()
  public id = null;

  @Input()
  public isHideNav = true;

  @ViewChild(QuillComponent)
  public quillComponent: QuillComponent;

  @ViewChild(IllustrationComponent)
  public illustration: IllustrationComponent;

  public loading = false;

  constructor(
    public fb: FormBuilder,
    public comboService: ComboService,
    public notification: NzNotificationService) { }

  ngOnInit() {

    const interval = {
      start_time: [ null, [ Validators.required, Validators.min(0) ] ],
      money: [ null, [ Validators.required, Validators.min(0) ] ]
    };

    this.interval = this.fb.array([
      this.fb.group(interval),
      this.fb.group(interval),
      this.fb.group({
        start_time: [ null, [ Validators.min(0) ] ],
        money: [ null, [ Validators.min(0) ] ]
      }),
      this.fb.group({
        start_time: [ null, [ Validators.min(0) ] ],
        money: [ null, [ Validators.min(0) ] ]
      }),
      this.fb.group({
        start_time: [ null, [ Validators.min(0) ] ],
        money: [ null, [ Validators.min(0) ] ]
      })
    ]);

    this.validateForm = this.fb.group({
      cover_img: [ null, [ ] ],
      content: [ null, [ ] ],
      name: [ null, [ Validators.required ] ],
      bike_count: [ null, [ Validators.required, Validators.min(0) ] ],
      interval: this.interval
    });

    if (this.id) {
      this.comboService.getDetail({id: this.id})
        .subscribe({
          next: (ret: any) => {
            this.validateForm.patchValue(ret.data);
            this.quillComponent.editor.pasteHTML(ret.data.content);
          },
          error: err => {
            this.notification.error('服务的错误', '获取套餐详情失败 =>' + JSON.stringify(err));
          }
        });
    }
  }

  submitForm(): void {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
    for (const formGroup of this.interval.controls) {
      const controls = (formGroup as FormGroup).controls;
      // tslint:disable-next-line:forin
      for (const i in controls) {
        controls[ i ].markAsDirty();
        controls[ i ].updateValueAndValidity();
      }
    }
    iif(() => this.validateForm.valid, of(this.validateForm.value)).pipe(
      // 初始化参数
      map(f => ({
        ...f,
        interval: f.interval
        .filter(interval => interval.start_time)
        .map((interval, i) => {

          interval = {start_time: Number(interval.start_time), money: Number(interval.money)};
          if (f.interval[i + 1]) {
            interval = {
              ...interval,
              end_time: Number(f.interval[i + 1].start_time)
            };
          }

          if (!interval.end_time) {
            interval.end_time = 999999;
          }
          return interval;
        })
      })),
      // 更新的时候， 需要id
      tap((parmas: any) => {
        console.log(parmas.interval);
        if (this.id) {
          parmas.id = this.id;
        }
      }),
      tap((parmas: any) => {
        parmas.bike_count = Number(parmas.bike_count);
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
      switchMap((parmas: SaveRequestParams) => {
        return this.comboService.saveOrUpdate(parmas);
      })
    )
    .subscribe({
      next: (data: any) => {
        this.notification.success('套餐', '添加套餐成功！');
        this.loading = false;
      },
      error: err => {
        this.loading = false;
        this.notification.error('服务的错误', '添加套餐失败！！');
      }
    });
  }

  // 触发事件 html标记语言， text文本
  onContentChanged({ html, text }) {

  }
}
