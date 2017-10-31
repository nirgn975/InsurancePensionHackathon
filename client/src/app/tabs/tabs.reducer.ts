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
      localStorage.setItem('IphUserToken', action.payload.token);
      const newLogin = {
        token: action.payload.token
      };

      return Object.assign({}, state, newLogin);
    }

    case login.LOGIN_FAILED: {
      console.log('LOGIN_FAILED');
      break;
    }

    default: {
      return state;
    }
  }
}
