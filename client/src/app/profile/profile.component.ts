import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromRoot from '../reducers';
import * as profileAction from './profile.action';

@Component({
  selector: 'iph-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public haveData: Boolean = false;

  constructor(
    private router: Router,
    private store: Store<fromRoot.State>,
  ) { }


  ngOnInit() {
    this.store.dispatch(new profileAction.ProfileAction());
    // this.store.select(fromRoot.getProfileState).subscribe(
    //   res => {
    //     console.log(res);
    //   }
    // );
    // if (this.haveData) {
    //   this.router.navigate(['profile/bond']);
    // }
  }
}
