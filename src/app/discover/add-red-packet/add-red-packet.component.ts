import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-add-red-packet',
  templateUrl: './add-red-packet.component.html',
  styleUrls: ['./add-red-packet.component.css']
})
export class AddRedPacketComponent implements OnInit {
  @Input() isHideNav = true
  constructor() { }

  ngOnInit() {
  }

}
