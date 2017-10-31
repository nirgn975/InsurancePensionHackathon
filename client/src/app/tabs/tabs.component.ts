import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'iph-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  tabsIndex = {
    0: 'ממשלתי',
    1: 'מניות',
    2: 'אג״ח'
  };

  constructor() { }

  ngOnInit() {
  }

  getChart(event) {
    // Dispatche (action) -> effect -> service -> action -> reducer -> store
    console.log(this.tabsIndex[event]);
  }
}
