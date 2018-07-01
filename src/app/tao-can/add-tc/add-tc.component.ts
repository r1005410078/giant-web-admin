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

@Component({
  selector: 'app-add-tc',
  templateUrl: './add-tc.component.html',
  styleUrls: ['./add-tc.component.css'],
  providers: [FormBuilder]
})
export class AddTcComponent implements OnInit {
  private validateForm: FormGroup;
  private interval: FormArray;

  @Input()
  private isHideNav = true

  @ViewChild(QuillComponent)
  private quillComponent: QuillComponent;

  constructor(private fb: FormBuilder, private comboService: ComboService, private notification: NzNotificationService) { }

  ngOnInit() {
    this.interval = this.fb.array([
      this.fb.group({
        time: [ null, [ Validators.required ] ],
        money: [ null, [ Validators.required ] ],
      }),
      this.fb.group({
        time: [ null, [ Validators.required ] ],
        money: [ null, [ Validators.required ] ],
      }),
      this.fb.group({
        time: [ null, [ Validators.required ] ],
        money: [ null, [ Validators.required ] ],
      })
    ])

    this.validateForm = this.fb.group({
      name: [ null, [ Validators.required ] ],
      bike_count: [ null, [ Validators.required ] ],
      status: ['', [Validators.required]],
      interval: this.interval
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
    for (const formGroup of this.interval.controls) {
      const controls = (formGroup as FormGroup).controls
      for (const i in controls) {
        controls[ i ].markAsDirty();
        controls[ i ].updateValueAndValidity();
      }
    }

    if (this.validateForm.valid) {
      const f = this.validateForm.value
      const parmas = {
        bike_count: f.bike_count,
        content: this.quillComponent.editorInnerHTML,
        cover_img: "",
        id: "",
        interval: f.interval,
        name: f.name,
        status: f.status
      }
      this.comboService.saveOrUpdate(parmas)
        .subscribe({
          next: (data: any) => {
            console.log(data)
          },
          error: err => {
            this.notification.error("服务的错误", "添加套餐失败！！")
          }
        })
    }
  }

  // 触发事件 html标记语言， text文本
  onContentChanged({ html, text }) {

  }
}
