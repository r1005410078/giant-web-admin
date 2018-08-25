import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { uptokenApi } from './api';
import { switchMap, map, distinct, concatMap } from 'rxjs/operators';
import { of, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QiniuUploadService {

  constructor(private http: HttpClient) { }

  public upload (base64s: Array<string>) {
    return this.http.post(uptokenApi, {})
      .pipe(
        switchMap((ret: {data?: {token: string}}) => {
          return from(base64s).pipe(
            switchMap( (base64: string) => {
              return of({base64: base64.split(',')[1], token: ret.data.token})
            })
          )
        }),
        concatMap((data: {base64: string, token: string}) => {
          return this.http.post('http://upload.qiniup.com/putb64/-1', data.base64, {
            headers: {
              'Content-Type': 'application/octet-stream',
              "Authorization": `UpToken ${data.token}`
            }
          })
          .pipe(
            map((ret: {hash: string, key: string}) => 'http://pb84tovoy.bkt.clouddn.com/' + ret.key)
          )
        })
      )
  }
}
