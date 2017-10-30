import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'iph-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  tabsIndex = {
    0: '',
    1: '',
    2: '',
  }
  constructor() { }

  ngOnInit() {
  }

  countChange(event) {
    // Dispatche (action) -> effect -> service -> action -> reducer -> store
    console.log(this.tabsIndex[event]);
  }

}
