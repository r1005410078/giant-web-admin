import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  data = new Array(5).fill({}).map((i, index) => {
    return {
      title: `骑车注意事项 ${index}`,
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content: '骑自行车外出比起走路,不安全的因素增加了,需要注意的安全事项如下: 1.要经常检修自行车,保持车况完好。车闸、车铃是否灵敏、正常,尤其重要。 2.骑保持车况完好。车闸、车铃是否灵敏、正常,尤其重要'
    };
  });
  constructor() { }

  ngOnInit() {
  }

}
