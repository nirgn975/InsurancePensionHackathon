import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'iph-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  validateUser(id, password) {
    if (id !== '' && password !== '') {
      localStorage.setItem('IphUserToken', 'someValue');
    }
  }

}
