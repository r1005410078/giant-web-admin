import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-red-packet-detail',
  templateUrl: './red-packet-detail.component.html',
  styleUrls: ['./red-packet-detail.component.css']
})
export class RedPacketDetailComponent implements OnInit {

  constructor(public activatedRoute: ActivatedRoute) { }
  private id:string;
  ngOnInit() {
  }

  ngAfterContentInit () {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.id = param.get('id')
    })
  }

}
