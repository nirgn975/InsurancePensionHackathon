import * as profile from './profile.action';

export type State = any;

const initialState: State = {};

export function reducer(state = initialState, action: profile.Actions): State {
  switch (action.type) {
    case profile.PROFILE: {
      return initialState;
    }

    case profile.PROFILE_SUCCESS: {
      return action.payload;
    }

    case profile.PROFILE_FAILED: {
      console.log('PROFILE_FAILED');
      break;
    }

    default: {
      return state;
    }
  }
}
