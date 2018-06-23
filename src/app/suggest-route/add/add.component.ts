import { Component, OnInit, Input } from '@angular/core';
import { BmapService } from '../../bmap.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  @Input() isHideNav = true
  constructor(private bmapService: BmapService) {
    
  }
  ngOnInit() {
   
  }

  onEideBMap () {
    this.bmapService.toggleState.next()
  }

}
