import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';

@Component({
  selector: 'iph-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  users: User[] = [];
  user: User = new User("", "", "");
  constructor() {

  }

  ngOnInit() {
  }

  submit() {
    console.log(this.user);
    this.users.push(this.user);
    console.log(this.users);
  }

}
