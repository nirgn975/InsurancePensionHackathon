import 'rxjs/add/operator/switchMap';
import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { LoginService } from './login.service';
import * as login from './login.action';

@Injectable()
export class LoginEffects {
  constructor(
    private actions$: Actions,
    private loginService: LoginService,
  ) { }

  @Effect()
  login$: Observable<Action>= this.actions$
    .ofType(login.LOGIN)
    .map(toPayload)
    .switchMap(loginInfo => this.loginService.login(loginInfo)
      .map(loginData => new login.LoginSuccessAction(loginData))
      // .catch(() => Observable.of({ type: 'LOGIN_FAILED' }))
    );
}
