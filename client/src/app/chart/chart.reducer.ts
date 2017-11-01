import { Chart } from './chart.model';
import * as chart from './chart.action';

export type State = Chart[];

const initialState: State = [{
  month: 0,
  min: 0,
  max: 0,
}];

export function reducer(state = initialState, action: chart.Actions): State {
  switch (action.type) {

    case chart.CHART: {
      return initialState;
    }

    case chart.CHART_SUCCESS: {
      return action.payload;
    }

    case chart.CHART_FAILED: {
      console.log('TABS_FAILED');
      break;
    }

    default: {
      return state;
    }
  }
}
