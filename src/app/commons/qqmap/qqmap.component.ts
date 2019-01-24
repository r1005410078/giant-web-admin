import { EventEmitter, Component, OnInit, ViewChild, ElementRef, Input, Output } from '@angular/core';

declare const qq;

@Component({
  selector: 'app-qqmap',
  templateUrl: './qqmap.component.html',
  styleUrls: ['./qqmap.component.css']
})
export class QqmapComponent implements OnInit {
  @ViewChild('map') mapElementRef: ElementRef;
  @ViewChild('place') placeElementRef: ElementRef;
  @Output() 
  public onMapChange: EventEmitter<string> = new EventEmitter();
  constructor() { }
  public mapResult = null
  ngOnInit() {

  }
  ngAfterContentInit() {
    var geocoder = new qq.maps.Geocoder({
      complete: reuslt => {
        console.log(reuslt)
        this.onMapChange.emit(reuslt);
      }
    })
    var map = new qq.maps.Map(this.mapElementRef.nativeElement,{
      center:  new qq.maps.LatLng(29.817352, 121.547155),
      zoom: 13
    });
    //获取城市列表接口设置中心点
    const citylocation = new qq.maps.CityService({
      complete : function(result){
        map.setCenter(result.detail.latLng);
      }
    });
    //调用searchLocalCity();方法    根据用户IP查询城市信息。
    citylocation.searchLocalCity();
    //实例化自动完成
    var ap = new qq.maps.place.Autocomplete(this.placeElementRef.nativeElement);
    //调用Poi检索类。用于进行本地检索、周边检索等服务。
    var searchService = new qq.maps.SearchService({
      complete : function(results){
        if(results.type === "CITY_LIST") {
          alert("当前检索结果分布较广，请指定城市进行检索");
          return;
        }
        var pois = results.detail.pois;
        var latlngBounds = new qq.maps.LatLngBounds();
        for(var i = 0,l = pois.length;i < l; i++){
          var poi = pois[i];
          latlngBounds.extend(poi.latLng);  
          // var marker = new qq.maps.Marker({
          //     map:map,
          //     position: poi.latLng
          // });
          // marker.setTitle(poi.name);
        }
        map.fitBounds(latlngBounds);
      }
    });
    //添加监听事件
    qq.maps.event.addListener(ap, "confirm", function(res){
      searchService.search(res.value);
    });
    qq.maps.event.addListener(map, 'click', function(event) {
      geocoder.getAddress(event.latLng);
      var anchor = new qq.maps.Point(10, 30);
      var size = new qq.maps.Size(32, 30);
      var origin = new qq.maps.Point(0, 0);
      var icon = new qq.maps.MarkerImage('/assets/imgs/plane.png', size, origin, anchor);
      size = new qq.maps.Size(52, 30);
      var originShadow = new qq.maps.Point(32, 0);
      var shadow =new qq.maps.MarkerImage(
          '/assets/imgs/plane.png', 
          size, 
          originShadow,
          anchor 
      );
      var marker = new qq.maps.Marker({
        icon: icon,
        shadow: shadow,
        position:event.latLng, 
        map:map,
        animation: qq.maps.MarkerAnimation.BOUNCE
      });
      qq.maps.event.addListener(map, 'click', function(event) {
        marker.setMap(null);
      });
    });
  }
}
