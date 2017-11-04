import { Component } from '@angular/core';

@Component({
  selector: 'iph-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {
  tabsIndex = [
    {url: 'bond', name: 'אג״ח'},
    {url: 'stock', name: 'מניות'},
    {url: 'gov', name: 'ממשלתי'},
  ];

  constructor() { }

}
