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
  selector: 'app-bmap',
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
export class BmapComponent implements OnInit, AfterContentInit, OnDestroy {
  @Input() city = '杭州市';
  @Input() id = 'bmap';
  @Input() className = 'bmap';
  @Output() addMarker: EventEmitter<{}>;
  @ViewChild('map') mapElementRef: ElementRef;
  @ViewChild('autocomplete') autocompleteElementRef: ElementRef;
  public bMap; // 百度地图
  public autocomplete;
  public untoggleState: Subscription;
  constructor(public bmapService: BmapService) {

  }

  ngOnInit() {
    this.untoggleState = this.bmapService.toggleState.subscribe((data: any) => {
      this.bmapService.address = data;
      if (this.bmapService.address.address) {
        this.setPlace(this.bmapService.address.address);
      }
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
      .createAutocomplete();
  }
  /**
   * 创建地图
   */
  createBMap () {
    this.bMap = new BMap.Map(this.mapElementRef.nativeElement);
    this.bMap.centerAndZoom(this.city, 11);
    return this;
  }

  onChange (value) {
  }
  /**
   * 建立一个自动完成的对象
   */
  createAutocomplete () {
    this.autocomplete = new BMap.Autocomplete({
      'input' : this.autocompleteElementRef.nativeElement,
      'location' : this.bMap
    });
    this.autocomplete.addEventListener('onconfirm', this.onconfirm);
  }
  // 鼠标点击下拉列表后的事件
  onconfirm = e => {
    const _value = e.item.value;
    const myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
    const myGeo = new BMap.Geocoder();
    myGeo.getPoint(myValue, point => {
      if (point) {
        this.bmapService.address = {
          ...point,
          address: myValue
        };
      }
    }, this.city);
    this.setPlace(myValue);
  }
  /**
   * 添加搜索到标记
   * @param myValue
   */
  setPlace(myValue) {
    this.bMap.clearOverlays();    // 清除地图上所有覆盖物
    const local = new BMap.LocalSearch(this.bMap, { // 智能搜索
      onSearchComplete: () => {
        const pp = local.getResults().getPoi(0).point;    // 获取第一个智能搜索的结果
        this.bMap.centerAndZoom(pp, 18);
        this.bMap.addOverlay(new BMap.Marker(pp));    // 添加标注
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
