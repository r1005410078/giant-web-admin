import { Injectable } from '@angular/core';
import { SaveRequestParams, DetailRequestParams, ListRequestParams } from './model';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ComboService {

  constructor(private http: HttpClient) { }

  public saveOrUpdate (params: SaveRequestParams) {
    return this.http.post('http://localhost:4200/api/system/combo/saveOrUpdate', params)
  }

  public getDetail (params: DetailRequestParams) {
    return this.http.post('/api/system/combo/detail', params)
  }

  public getList (params: ListRequestParams) {
    return this.http.post('/api/system/combo/list', params)
  }
}
