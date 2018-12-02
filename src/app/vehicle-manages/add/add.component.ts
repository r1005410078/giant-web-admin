import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { NzNotificationService, UploadFile } from '../../../../node_modules/ng-zorro-antd';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  @Input() id = null;
  @Input() isHideNav = true;

  public loading = false;
  public vehicleGroup: FormGroup;

  constructor(
    public router: ActivatedRoute, public fb: FormBuilder, public http: HttpClient,  public notification: NzNotificationService) { }

  ngOnInit() {
    this.vehicleGroup = this.fb.group({
      id: [null, []],
      bike_no: [null, [Validators.required]],
      bike_money: [null, [Validators.required]],
      bike_type: [null, [Validators.required]],
      type_no: [null, [Validators.required]],
      bike_frame_no: [null, [Validators.required]]
    });
    if (this.id) {
      this.http.post('/api/system/bike/detail', {id: this.id})
        .subscribe((ret: {data: Object}) => {
          this.vehicleGroup.patchValue(ret.data);
        });
    }
  }

  submitForm () {
    // tslint:disable-next-line:forin
    for (const i in this.vehicleGroup.controls) {
      this.vehicleGroup.controls[ i ].markAsDirty();
      this.vehicleGroup.controls[ i ].updateValueAndValidity();
    }
    if (this.vehicleGroup.valid) {
      this.loading = true;
      this.http.post('/api/system/bike/saveOrUpdate', this.vehicleGroup.value)
        .subscribe((ret: any) => {
          this.loading = false;
          if (ret.data && ret.data.length > 0) {
            this.notification.warning('车辆', '保存成功！,  导入了重复的车辆： 编号：' + ret.data, {nzDuration: 5000, nzPauseOnHover: true});
          } else {
            this.notification.success('车辆', '车辆保存成功！');
          }
        });
    }
  }

  beforeUpload = (file: UploadFile): boolean => {
    const names = file.name.split('.');
    if (names[names.length - 1] === 'xlsx') {
      return true;
    }
    this.notification.warning('上传错误！', '格式错误,  请上传excel');
    return false;
  }

  handleChange(info: any): void {
    if (info.type === 'success') {
      console.log(info);
      if (info.file.response.data && info.file.response.data.length > 0) {
        this.notification.warning('车辆', '导入车辆,  导入了重复的车辆： 编号：' + info.file.response.data, {nzDuration: 5000, nzPauseOnHover: true});
      } else {
        this.notification.success('导入车辆', '车辆导入成功');
      }
    }
  }
}
