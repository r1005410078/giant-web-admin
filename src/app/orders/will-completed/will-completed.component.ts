import { Component, OnInit } from '@angular/core';
import { WillCompletedService } from '../services/will-completed.service';

@Component({
  selector: 'app-will-completed',
  templateUrl: './will-completed.component.html',
  styleUrls: ['./will-completed.component.css'],
  providers: [ WillCompletedService ]
})
export class WillCompletedComponent implements OnInit {
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  dataSet = [1];
  loading = true;
  sortValue = null;
  sortKey = null;
  filterGender = [
    { text: 'male', value: 'male' },
    { text: 'female', value: 'female' }
  ];
  searchGenderList: string[] = [];

  sort(sort: { key: string, value: string }): void {
    this.sortKey = sort.key;
    this.sortValue = sort.value;
    this.searchData();
  }

  constructor(private randomUserService: WillCompletedService) {
  }

  searchData(reset: boolean = false): void {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    this.randomUserService.getUsers(this.pageIndex, this.pageSize, this.sortKey, this.sortValue, this.searchGenderList).subscribe((data: any) => {
      this.loading = false;
      this.total = 200;
      this.dataSet = data.results;
    });
  }

  updateFilter(value: string[]): void {
    this.searchGenderList = value;
    this.searchData(true);
  }

  ngOnInit(): void {
    this.searchData();
  }
}
