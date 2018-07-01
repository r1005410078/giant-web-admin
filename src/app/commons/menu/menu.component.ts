import { Component, ViewChild, TemplateRef, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  title = 'app';
  isCollapsed = false;
  constructor () {

  }
  /** custom trigger can be TemplateRef **/
  changeTrigger(): void {

  }

  openMap = {
    sub1: true,
    sub2: false,
    sub3: false,
    sub4: false,
    sub5: false,
    sub6: false,
    sub7: false,
    sub8: false,
  };

  openHandler(value: string): void {
    for (const key in this.openMap) {
      if (key !== value) {
        this.openMap[ key ] = false;
      }
    }
  }
}
