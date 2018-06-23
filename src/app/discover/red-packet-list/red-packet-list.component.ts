import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-red-packet-list',
  templateUrl: './red-packet-list.component.html',
  styleUrls: ['./red-packet-list.component.css']
})
export class RedPacketListComponent implements OnInit {
  data = [1]
  constructor() { }

  ngOnInit() {
  }

}
