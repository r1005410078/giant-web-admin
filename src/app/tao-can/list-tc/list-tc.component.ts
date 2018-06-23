import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpClient } from '@angular/common/http';
const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';
@Component({
  selector: 'app-list-tc',
  templateUrl: './list-tc.component.html',
  styleUrls: ['./list-tc.component.css']
})
export class ListTcComponent implements OnInit {
  loading = true; // bug
  loadingMore = false;
  showLoadingMore = true;
  data = [];

  isVisible = false;


  constructor(private http: HttpClient, private msg: NzMessageService) { }
  
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  ngOnInit() {
    this.getData((res: any) => {
      this.data = res.results;
      this.loading = false;
    });
  }

  getData(callback: (res: any) => void): void {
    this.http.get(fakeDataUrl).subscribe((res: any) => callback(res));
  }

}
