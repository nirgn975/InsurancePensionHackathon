import { Action } from '@ngrx/store';

export const PROFILE =  '[Profile] Profile';
export const PROFILE_SUCCESS = '[Profile] Profile Success';
export const PROFILE_FAILED = '[Profile] Profile Failed';

export class ProfileAction implements Action {
  readonly type = PROFILE;

  constructor(public payload: any) { }
}

export class ProfileSuccessAction implements Action {
  readonly type = PROFILE_SUCCESS;

  constructor(public payload: any) { }
}

export class ProfileActionFailed implements Action {
  readonly type = PROFILE_FAILED;

  constructor() { }
}

export type Actions
  = ProfileAction
  | ProfileSuccessAction
  | ProfileActionFailed;
