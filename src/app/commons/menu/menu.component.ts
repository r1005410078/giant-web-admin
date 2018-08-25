import { Component, ViewChild, TemplateRef, AfterContentInit, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';
import { switchMap, concatAll, concatMap, tap } from '../../../../node_modules/rxjs/operators';
import { HttpClient } from '../../../../node_modules/@angular/common/http';
import { order_count_api } from '../../api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {

  title = 'app';
  isCollapsed = false;

  pendingDepositCount = 0;
  pendingCompletionCount = 0;
  pendingRentCount = 0;

  private orderCount: Subscription;

  // tslint:disable-next-line:member-ordering
  private openMap = {};
  private selectedMap = {};
  constructor (private http: HttpClient) {
    if (!localStorage.getItem('openMap')) {
      localStorage.setItem('openMap', JSON.stringify({
        sub1: true,
        sub2: false,
        sub3: false,
        sub4: false,
        sub5: false,
        sub6: false,
        sub7: false,
        sub8: false,
      }));
    }
    if (!localStorage.getItem('selectedMap')) {
      localStorage.setItem('selectedMap', JSON.stringify({
        sub1_item1: true,
        sub1_item2: false,
        sub1_item3: false,
        sub1_item4: false,
        sub2_item1: false,
        sub2_item2: false,
        sub3_item1: false,
        sub3_item2: false,
        sub4_item1: false,
        sub4_item2: false,
        sub5_item1: false,
        sub5_item2: false,
        sub6_item1: false,
        sub6_item2: false,
        sub6_item3: false,
        sub6_item4: false,
        sub7_item1: false,
        sub7_item2: false,
        sub8_item1: false,
        sub9_item1: false,
        sub9_item2: false
      }));
    }
    this.selectedMap = JSON.parse(localStorage.getItem('selectedMap'));
    this.openMap = JSON.parse(localStorage.getItem('openMap'));

  }
  /** custom trigger can be TemplateRef **/
  changeTrigger(): void {

  }


  openHandler(value: string): void {
    for (const key in this.openMap) {
      if (key !== value) {
        this.openMap[ key ] = false;
      }
    }
    localStorage.setItem('openMap', JSON.stringify(this.openMap));
  }

  onSelected(value: string): void {
    console.log(this.selectedMap);
    for (const key in this.selectedMap) {
      if (key === value) {
        this.selectedMap[ key ] = true;
      } else {
        this.selectedMap[ key ] = false;
      }
    }
    localStorage.setItem('selectedMap', JSON.stringify(this.selectedMap));
  }

  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    this.orderCount = interval(5000)
      .pipe(
        tap(parmas => {
          this.http.post(order_count_api, {
            deposit_status: 0,
            rent_status: 0
          })
          .subscribe((res: any) => {
            this.pendingDepositCount = res.data.count;
          });
        }),
        tap(parmas => {
          return this.http.post(order_count_api, {
            deposit_status: 1,
            rent_status: 0
          })
          .subscribe((res: any) => {
            this.pendingRentCount = res.data.count;
          });
        }),
        tap(parmas => {
          return this.http.post(order_count_api, {
            deposit_status: 1,
            rent_status: 1
          })
          .subscribe((res: any) => {
            this.pendingCompletionCount = res.data.count;
          });
        })
    )
    .subscribe((data) => {
      // console.log(1111, data);
    });
  }

  ngOnDestroy(): void {
    this.orderCount.unsubscribe();
  }
}
