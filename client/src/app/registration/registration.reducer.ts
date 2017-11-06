import { RegistrationResponse } from './registration.model';
import * as registration from './registration.action';

export type State = RegistrationResponse;

const initialState: State = {
  token: '',
};

export function reducer(state = initialState, action: registration.Actions): State {
  switch (action.type) {
    case registration.REGISTRATION: {
      return initialState;
    }

    case registration.REGISTRATION_SUCCESS: {
      localStorage.setItem('IphUserToken', action.payload.token);
      const newRegistration = {
        token: action.payload.token
      };

      return Object.assign({}, state, newRegistration);
    }

    case registration.REGISTRATION_FAILED: {
      console.log('REGISTRATION_FAILED');
      break;
    }

    default: {
      return state;
    }
  }
}
