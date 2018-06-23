import { Component, OnInit, ViewChild, ElementRef, AfterContentInit, Input } from '@angular/core';
import { BmapService } from '../../bmap.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit, AfterContentInit {
  @Input() isHideNav = true
  constructor(private bmapService: BmapService) {
    
  }

  onEideBMap() {
    this.bmapService.toggleState.next()
  }

  ngOnInit() {
  }

  ngAfterContentInit () {
   
  }
}
