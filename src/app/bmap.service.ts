import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class BmapService {
  routeAddress = {moreResultsUrl: ''};
  toggleStateRouteMap = new Subject<any>();
  address = {
    lng: null,
    lat: null,
    address: null
  };
  toggleState = new Subject<{address: string, lat: string, lng: string}>();
  constructor() { }
  clear () {
    this.address = {
      lng: null,
      lat: null,
      address: null
    };
  }
}
