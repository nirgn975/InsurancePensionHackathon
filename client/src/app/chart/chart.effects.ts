import 'rxjs/add/operator/switchMap';
import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { ChartService } from './chart.service';
import * as chart from './chart.action';

@Injectable()
export class ChartEffects {
  constructor(
    private actions$: Actions,
    private chartService: ChartService,
  ) { }

  @Effect()
  chart$: Observable<Action>= this.actions$
    .ofType(chart.CHART)
    .map(toPayload)
    .switchMap(tabName => this.chartService.getChart(tabName)
      .map(chartData => new chart.ChartSuccessAction(chartData))
      // .catch(() => Observable.of({ type: 'CHART_FAILED' }))
    );
}
