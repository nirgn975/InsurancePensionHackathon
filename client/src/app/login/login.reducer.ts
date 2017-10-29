import { Login } from './login.model';
import * as login from './login.action';

export interface State {
  login: Login;
}

const initialState: State = {
  login: {
    id: '',
    password: '',
  },
};

export function reducer(state = initialState, action: login.Actions): State {
  switch (action.type) {
    case login.LOGIN: {
      return initialState;
    }

    case login.LOGIN_SUCCESS: {
      localStorage.setItem('IphUserToken', action.payload.password);
      const newLogin = {
        login:  {
          _id: action.payload._id,
          id: action.payload.id,
          password: action.payload.password,
        }
      };

      return Object.assign({}, state, newLogin);
    }

    case login.LOGIN_FAILED: {
      console.log('LOGIN_FAILED');
    }
    return;

    default: {
      return state;
    }
  }
}
