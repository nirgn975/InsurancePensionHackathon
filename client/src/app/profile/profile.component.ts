import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'iph-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public haveData: Boolean = true;

  constructor(
    private router: Router,
  ) { }


  ngOnInit() {
    if (this.haveData) {
      this.router.navigate(['profile/bond']);
    }
  }

}
