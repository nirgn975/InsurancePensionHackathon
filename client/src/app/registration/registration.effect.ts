import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';

import { RegistrationService } from './registration.service';
import * as registration from './registration.action';

@Injectable()
export class RegistrationEffects {
  constructor(
    private actions$: Actions,
    private registrationService: RegistrationService,
  ) { }

  @Effect()
  registration$: Observable<Action>= this.actions$
    .ofType(registration.REGISTRATION)
    .map(toPayload)
    .switchMap(registrationInfo => this.registrationService.newUserRegistration(registrationInfo)
      .map(registrationData => new registration.RegistrationSuccessAction(registrationData))
      .catch(() => Observable.of({ type: 'REGISTRATION_FAILED' }))
    );
}
