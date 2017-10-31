import { Component } from '@angular/core';

@Component({
  selector: 'iph-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {
  tabsIndex = ['ממשלתי', 'מניות', 'אג״ח'];

  constructor() { }

  getChart(event) {
    console.log(this.tabsIndex[event]);
  }
}
