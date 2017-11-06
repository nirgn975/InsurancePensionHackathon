import { Action } from '@ngrx/store';
import { Registration, RegistrationResponse } from './registration.model';

export const REGISTRATION =  '[Registration] Registration';
export const REGISTRATION_SUCCESS = '[Registration] Registration Success';
export const REGISTRATION_FAILED = '[Registration] Registration Failed';

export class RegistrationAction implements Action {
  readonly type = REGISTRATION;

  constructor(public payload: Registration) { }
}

export class RegistrationSuccessAction implements Action {
  readonly type = REGISTRATION_SUCCESS;

  constructor(public payload: RegistrationResponse) { }
}

export class RegistrationActionFailed implements Action {
  readonly type = REGISTRATION_FAILED;

  constructor() { }
}

export type Actions
  = RegistrationAction
  | RegistrationSuccessAction
  | RegistrationActionFailed;
