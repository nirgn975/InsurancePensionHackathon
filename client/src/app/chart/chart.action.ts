import { Action } from '@ngrx/store';
import { Chart } from './chart.model';

export const CHART =  '[Chart] Chart';
export const CHART_SUCCESS = '[Chart] Chart Success';
export const CHART_FAILED = '[Chart] Chart Failed';

export class ChartAction implements Action {
  readonly type = CHART;

  constructor(public payload: String) { }
}

export class ChartSuccessAction implements Action {
  readonly type = CHART_SUCCESS;

  constructor(public payload: Chart[]) { }
}

export class ChartActionFailed implements Action {
  readonly type = CHART_FAILED;

  constructor() { }
}

export type Actions
  = ChartAction
  | ChartSuccessAction
  | ChartActionFailed;
