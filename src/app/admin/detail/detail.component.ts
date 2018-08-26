import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  constructor(public activatedRoute: ActivatedRoute) { }
  public id:string;
  ngOnInit() {
  }

  ngAfterContentInit () {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.id = param.get('id')
    })
  }

}
