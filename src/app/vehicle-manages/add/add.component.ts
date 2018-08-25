import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { NzNotificationService } from '../../../../node_modules/ng-zorro-antd';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  @Input() id = null;
  @Input() isHideNav = true;

  private loading = false;
  private vehicleGroup: FormGroup;

  constructor(
    private router: ActivatedRoute, private fb: FormBuilder, private http: HttpClient,  private notification: NzNotificationService) { }

  ngOnInit() {
    this.vehicleGroup = this.fb.group({
      id: [null, []],
      bike_no: [null, [Validators.required]],
      bike_money: [null, [Validators.required]],
      bike_type: [null, []]
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
        .subscribe(data => {
          this.loading = false;
          this.notification.success('车辆', '车辆保存成功！');
        });
    }
  }
}
