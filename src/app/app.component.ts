import { Component, AfterContentInit } from '@angular/core';
import { UserinfoService } from './userinfo.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentInit {
  constructor (public router: Router, public userinfo: UserinfoService) {}
  public isCollapsed = false;
  onLogout () {
    this.userinfo.logout();
  }
  ngAfterContentInit () {
    document.getElementById('loading').remove();
  }
}
