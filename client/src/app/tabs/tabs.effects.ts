import 'rxjs/add/operator/switchMap';
import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { TabsService } from './tabs.service';
import * as tabs from './tabs.action';

@Injectable()
export class TabsEffects {
  constructor(
    private actions$: Actions,
    private tabsService: TabsService,
  ) { }

  @Effect()
  tabs$: Observable<Action>= this.actions$
    .ofType(tabs.TABS)
    .map(toPayload)
    .switchMap(tabName => this.tabsService.getChart(tabName)
      .map(chartData => new tabs.TabsSuccessAction(chartData))
      .catch(() => Observable.of({ type: 'TABS_FAILED' }))
    );
}
