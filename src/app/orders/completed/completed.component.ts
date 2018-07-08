import { Component, OnInit } from '@angular/core';
import { QiniuUploadService } from '../../qiniu-upload.service';


@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.css']
})
export class CompletedComponent implements OnInit {

  constructor(private qiniu: QiniuUploadService) { }

  ngOnInit() {
    // console.log(11111, this.qiniu)
    // this.qiniu.upload(['ddd,111', 'aaa, 2222'])
    //   .subscribe(value => {
    //     console.log(value)
    //   })
  }

}
