import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

class Crisis {
  constructor(public id: number) { }
}


@Component({
  selector: 'app-update-detail',
  templateUrl: './update-detail.component.html',
  styleUrls: ['./update-detail.component.css']
})
export class UpdateDetailComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }
  
  public id;
  ngOnInit() {
    this.activatedRoute.params.subscribe(queryParams => {
      console.log(queryParams)
      this.id = queryParams.id
    })
  }

}
