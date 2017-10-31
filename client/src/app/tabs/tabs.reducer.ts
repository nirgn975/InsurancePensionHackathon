import { Chart } from '../chart/chart.model';
import * as tabs from './tabs.action';

export type State = Chart;

const initialState: State = {
  month: '',
  apples: 1,
  bananas: 2,
  cherries: 3,
  dates: 4,
};

export function reducer(state = initialState, action: tabs.Actions): State {
  switch (action.type) {

    case tabs.TABS: {
      return initialState;
    }

    case tabs.TABS_SUCCESS: {
      return action.payload;
    }

    case tabs.TABS_FAILED: {
      console.log('TABS_FAILED');
      break;
    }

    default: {
      return state;
    }
  }
}
