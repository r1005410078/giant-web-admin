import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  stationList = this.http.post('/api/system/station/list', {
    'page': 1,
    'page_size': 100
  }).pipe(
    map((data: any) => data.data.data.map(item => ({ text: item.name, value: item.id })))
  );
}
