import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../reducers';
import * as tabsAction from './tabs.action';

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

  constructor(
    private store: Store<fromRoot.State>,
  ) { }

  ngOnInit() {
  }

  getChart(event) {
    this.store.dispatch(new tabsAction.TabsAction(this.tabsIndex[event]));
  }
}
