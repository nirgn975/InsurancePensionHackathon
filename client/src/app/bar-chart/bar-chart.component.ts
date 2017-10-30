import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'iph-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  countChange(event) {
    console.log(event);
  }

}
