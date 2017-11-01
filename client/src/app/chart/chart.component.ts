import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromRoot from '../reducers';
import * as chartAction from './chart.action';

@Component({
  selector: 'iph-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromRoot.State>,
  ) { }

  ngOnInit() {
    const newCategory = this.route.snapshot.params['category'];
    this.store.dispatch(new chartAction.ChartAction(newCategory));
  }

}
