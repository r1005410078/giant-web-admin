import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd';
import { iif, of } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  @Input() isHideNav = false;
  @Input() id = null;
  public loading = false;
  public validateForm: FormGroup;

  constructor(public http: HttpClient, public fb: FormBuilder, public notification: NzNotificationService) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      phone: [ null, [ Validators.required ] ],
      username: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ],
      rolelist: [ 2, [ Validators.required ] ],
    });
    if (this.id) {
      this.http.post('/api/system/admin/detail', {id: this.id})
        .subscribe((ret: any) => {
          this.validateForm.patchValue(ret.data);
          this.validateForm.get('rolelist').setValue(ret.data.role_list[0] ? ret.data.role_list[0].id : 2);
        });
    }
  }

  submitForm () {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
    this.loading = true;
    iif(() => this.validateForm.valid, of(this.validateForm.value)).pipe(
      // 更新的时候， 需要id
      tap((parmas: any) => {
        if (this.id) {
          parmas.id = this.id;
        }
        parmas.role_list = [parmas.rolelist];
      }),
      // 保存数据
      switchMap((parmas: any) => {
        return this.http.post('/api/system/admin/saveOrUpdate', parmas);
      })
    )
    .subscribe(() => {
      this.loading = false;
      this.notification.success('管理员', '添加管理员成功');
    });
  }
}
