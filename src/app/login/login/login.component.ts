import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';
import { UserinfoService } from '../../userinfo.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { loginApi } from '../../api';
import { NzNotificationService } from 'ng-zorro-antd';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [FormBuilder]
})
export class LoginComponent implements OnInit {

  validateForm: FormGroup;
  intervalForm: FormArray;

  submitForm(): void {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      this.http.post(loginApi, this.validateForm.value)
      .pipe(catchError(this.handleError()))
      .subscribe((value: {ok: boolean, data?: {token: string, role_id: string}, error_msg?: string}) => {
        if (value.error_msg) {
          this.notification.error('登陆错误', value.error_msg);
        }
        if (value.ok) {
          this.notification.success('登陆', '登陆成功!');
          this.userinfo.cookie.set('token', value.data.token);
          localStorage.setItem('userinfo', JSON.stringify(value.data));
          localStorage.setItem('role_id', JSON.stringify(value.data.role_id));
          this.router.navigateByUrl('/giant');
        }
      });
    }
  }

  public handleError () {
    return (error: any): Observable<any> => {
      this.notification.error('服务的错误', '登陆失败!');
      return of(null);
    };
  }

  constructor(
    public http: HttpClient,
    public router: Router, public fb: FormBuilder, public userinfo: UserinfoService, public notification: NzNotificationService) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ]
    });
  }

}
