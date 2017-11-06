import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';

import { ProfileService } from './profile.service';
import * as profile from './profile.action';

@Injectable()
export class ProfileEffects {
  constructor(
    private actions$: Actions,
    private profileService: ProfileService,
  ) { }

  @Effect()
  profile$: Observable<Action>= this.actions$
    .ofType(profile.PROFILE)
    .map(toPayload)
    .switchMap(() => this.profileService.getProfileData()
      .map(profileData => new profile.ProfileSuccessAction(profileData))
      .catch(() => Observable.of({ type: 'PROFILE_FAILED' }))
    );
}
