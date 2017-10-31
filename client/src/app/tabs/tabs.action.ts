import { Action } from '@ngrx/store';
import { Chart } from '../chart/chart.model';

export const TABS =  '[Tabs] Tabs';
export const TABS_SUCCESS = '[Tabs] Tabs Success';
export const TABS_FAILED = '[Tabs] Tabs Failed';

export class TabsAction implements Action {
  readonly type = TABS;

  constructor(public payload: String) { }
}

export class TabsSuccessAction implements Action {
  readonly type = TABS_SUCCESS;

  constructor(public payload: Chart) { }
}

export class TabsActionFailed implements Action {
  readonly type = TABS_FAILED;

  constructor() { }
}

export type Actions
  = TabsAction
  | TabsSuccessAction
  | TabsActionFailed;
