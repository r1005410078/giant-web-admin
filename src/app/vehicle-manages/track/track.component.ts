import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { tap, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Track } from '../interface';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {
  public id:string;
  public data: Array<Track>
  constructor(public activatedRoute: ActivatedRoute, public http: HttpClient) { }

  ngOnInit() {
    this.activatedRoute.paramMap.pipe(
      tap((param: ParamMap) => {
        this.id = param.get('id')
      }),
      switchMap(() => {
        return this.http.post('/api/system/bike/track', {
          id: this.id
        })
      })
    )
    .subscribe((ret: {ok: boolean, data: Array<Track>}) => {
      this.data = ret.data
    })
  }

}
