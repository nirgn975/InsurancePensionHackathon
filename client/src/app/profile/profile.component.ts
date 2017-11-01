import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'iph-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public haveData: Boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
