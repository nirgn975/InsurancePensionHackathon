import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Component, DoCheck } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Login } from './login.model';
import * as fromRoot from '../reducers';
import * as loginAction from './login.action';

@Component({
  selector: 'iph-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements DoCheck {
  loginForm: FormGroup;
  idControl;
  passwordControl;
  IdError = false;
  PasswordError = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private store: Store<fromRoot.State>,
  ) {
    this.loginForm = this.formBuilder.group({
      id: this.formBuilder.control(null, [Validators.minLength(2), Validators.required]),
      password: this.formBuilder.control(null, [Validators.minLength(2), Validators.required]),
    });

    this.idControl = this.loginForm.get('id');
    this.passwordControl = this.loginForm.get('password');
  }

  checkError(event) {
    // Check if the pressed key is tab, if so we dont want to run validation.
    if (event.keyCode === 9) {
      return;
    }

    const elementName = event.target.getAttribute('formcontrolname');
    switch (elementName) {
      case 'id': {
        this.IdError = true;
        break;
      }
      case 'password': {
        this.PasswordError = true;
        break;
      }
    }
  }

  onSubmit() {
    const formModel = {
      id: this.loginForm.value.id,
      password: this.loginForm.value.password,
    } as Login;
    this.store.dispatch(new loginAction.LoginAction(formModel));
  }

  ngDoCheck() {
    this.store.select(fromRoot.getLoginState).subscribe(
      res => {
        if (res.login.password) this.router.navigate(['profile']);
      }
    );
  }
}
