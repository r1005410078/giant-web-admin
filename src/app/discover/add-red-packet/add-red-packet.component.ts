import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { iif, of } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-add-red-packet',
  templateUrl: './add-red-packet.component.html',
  styleUrls: ['./add-red-packet.component.css']
})
export class AddRedPacketComponent implements OnInit {
  @Input() isHideNav = true;
  @Input() id = null;
  private loading = false;
  private validateForm: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder, private notification: NzNotificationService) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      cover_img: [ '11', [ Validators.required ] ],
      title: [ null, [ Validators.required ] ],
      content: [ null, [ Validators.required ] ],
      start_time: [ null, [ Validators.required ] ],
      end_time: [ null, [ Validators.required ] ],
      probability: [ null, [ Validators.required ] ],
      max_money: [ null, [ Validators.required ] ],
      min_money: [ null, [ Validators.required ] ],
      total_money: [ 10, [ Validators.required ] ],
      status: [ 1 ],
    });
    if (this.id) {
      this.http.post('/api/system/redpacket/detail', {id: this.id})
        .subscribe((ret: any) => {
          this.validateForm.patchValue(ret.data);
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
      }),
      // 保存数据
      switchMap((parmas: any) => {
        return this.http.post('/api/system/redpacket/saveOrUpdate', parmas);
      })
    )
    .subscribe(() => {
      this.loading = false;
      this.notification.success('红包', '添加红包成功');
    });
  }

}
