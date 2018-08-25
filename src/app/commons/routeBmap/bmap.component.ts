import { Component, OnInit, AfterContentInit, ViewChild, ElementRef, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { BmapService } from '../../bmap.service';
import { Subscriber, Subscription } from 'rxjs';
declare const BMap;

@Component({
  selector: 'app-route-bmap',
  templateUrl: './bmap.component.html',
  styleUrls: ['./bmap.component.css'],
  animations: [
    trigger('transformState', [
      state('inactive', style({
        transform: 'translate(100%, 0)'
      })),
      state('active',   style({
        transform: 'translate(0%, 0)'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-in'))
    ])
  ]
})
export class RouteBmapComponent implements OnInit, AfterContentInit, OnDestroy {
  @Input() city = '宁波市';
  @Input() id = 'routerMap';
  @Input() className = 'bmap';
  @Output() addMarker: EventEmitter<{}>;
  @ViewChild('routerMap') mapElementRef: ElementRef;
  @ViewChild('autocompleteStart') autocompleteStartElementRef: ElementRef;
  @ViewChild('autocompleteEnd') autocompleteEndElementRef: ElementRef;
  private bMap; // 百度地图
  private autocomplete;
  private transit = null;
  private ponits = {start: null, end: null};
  private untoggleState: Subscription;
  constructor(private bmapService: BmapService) {

  }

  ngOnInit() {
    this.untoggleState = this.bmapService.toggleStateRouteMap.subscribe((data: any) => {
      this.bmapService.routeAddress = data;
      this.toggleState();
    });
  }

  // tslint:disable-next-line:member-ordering
  transformState = 'inactive';

  toggleState () {
    this.transformState = this.transformState === 'active' ? 'inactive' : 'active';
  }

  bmapMarker () {
    const pt = new BMap.Point(116.417, 39.909);
    const myIcon = new BMap.Icon('http://lbsyun.baidu.com/jsdemo/img/fox.gif', new BMap.Size(300, 157));
  }

  ngAfterContentInit() {
    this.createBMap()
      .createAutocompleteStart()
      .createAutocompleteEnd();
  }
  /**
   * 创建地图
   */
  createBMap () {
    this.bMap = new BMap.Map(this.mapElementRef.nativeElement);
    this.bMap.centerAndZoom(this.city, 11);
    this.bMap.enableScrollWheelZoom(true);
    this.transit = new BMap.DrivingRoute(this.bMap, {
      renderOptions: {
        map: this.bMap,
        panel: 'r-result',
        enableDragging : true // 起终点可进行拖拽
      }
    });
    this.transit.setPolylinesSetCallback(this.setPolylinesSetCallback);
    return this;
  }

  setPolylinesSetCallback = routes => {
    this.bmapService.routeAddress = this.transit.getResults();
    console.log(this.bmapService.routeAddress);
  }

  /**
   * 建立一个自动完成的对象
   */
  createAutocompleteStart () {
    this.autocomplete = new BMap.Autocomplete({
      'input' : this.autocompleteStartElementRef.nativeElement,
      'location' : this.bMap
    });
    this.autocomplete.addEventListener('onconfirm', this.onconfirm.bind(this, 'start'));
    return this;
  }

  /**
   * 建立一个自动完成的对象
   */
  createAutocompleteEnd () {
    this.autocomplete = new BMap.Autocomplete({
      'input' : this.autocompleteEndElementRef.nativeElement,
      'location' : this.bMap
    });
    this.autocomplete.addEventListener('onconfirm', this.onconfirm.bind(this, 'end'));
  }
  // 鼠标点击下拉列表后的事件
  onconfirm = (type, e) => {
    const _value = e.item.value;
    const myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
    this.bmapService.address.address = myValue;
    this.addPlace(myValue, type);
  }
  /**
   * 添加搜索到标记
   * @param myValue
   */
  addPlace(myValue, type) {
    const local = new BMap.LocalSearch(this.bMap, { // 智能搜索
      onSearchComplete: () => {
        const poi = local.getResults().getPoi(0);
        this.ponits[type] = poi;
        if (this.ponits.start && this.ponits.end) {
          const gc = new BMap.Geocoder();
          this.transit.search(this.ponits.start.address, this.ponits.end.address);
        }
      }
    });

    local.search(myValue);

  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.untoggleState.unsubscribe();
    this.autocomplete.removeEventListener('onconfirm', this.onconfirm);
  }
}
