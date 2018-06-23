import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, AfterContentInit {

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
