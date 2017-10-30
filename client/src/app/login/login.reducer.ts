import { LoginResponse } from './login.model';
import * as login from './login.action';

export type State = LoginResponse;

const initialState: State = {
  token: '',
};

export function reducer(state = initialState, action: login.Actions): State {
  switch (action.type) {
    case login.LOGIN: {
      return initialState;
    }

    case login.LOGIN_SUCCESS: {
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
