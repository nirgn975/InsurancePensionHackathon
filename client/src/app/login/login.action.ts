import { Action } from '@ngrx/store';
import { Login, LoginResponse } from './login.model';

export const LOGIN =  '[Login] Login';
export const LOGIN_SUCCESS = '[Login] Login Success';
export const LOGIN_FAILED = '[Login] Login Failed';

export class LoginAction implements Action {
  readonly type = LOGIN;

  constructor(public payload: Login) { }
}

export class LoginSuccessAction implements Action {
  readonly type = LOGIN_SUCCESS;

  constructor(public payload: LoginResponse) { }
}

export class LoginActionFailed implements Action {
  readonly type = LOGIN_FAILED;

  constructor() { }
}

export type Actions
  = LoginAction
  | LoginSuccessAction
  | LoginActionFailed;
