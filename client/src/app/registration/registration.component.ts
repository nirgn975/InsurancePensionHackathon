import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Registration } from './registration.model';

@Component({
  selector: 'iph-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  years = ['2017', '2018', '2019', '2020', '2021', '2022'];
  loginForm: FormGroup;
  idControl;
  passwordControl;
  passwordConfirmationControl;
  cardNumberControl;
  cvvControl;
  expMonthControl;
  expYearControl;
  IdError = false;
  PasswordError = false;
  PasswordConfirmationError = false;
  CardNumberError = false;
  CvvError = false;
  ExpMonthError = false;
  ExpYearError = false;


  constructor(
    private formBuilder: FormBuilder,

  ) {
    this.loginForm = this.formBuilder.group({
      id: this.formBuilder.control(null, [Validators.minLength(2), Validators.required]),
      password: this.formBuilder.control(null, [Validators.minLength(2), Validators.required]),
      passwordConfirmation: this.formBuilder.control(null, [Validators.minLength(2), Validators.required]),
      cardNumber: this.formBuilder.control(null, [Validators.minLength(2), Validators.required]),
      cvv: this.formBuilder.control(null, [Validators.minLength(3), Validators.maxLength(3), Validators.required]),
      expMonth: this.formBuilder.control(null, [Validators.required]),
      expYear: this.formBuilder.control(null, [Validators.required]),
    });

    this.idControl = this.loginForm.get('id');
    this.passwordControl = this.loginForm.get('password');
    this.passwordConfirmationControl = this.loginForm.get('passwordConfirmation');
    this.cardNumberControl = this.loginForm.get('cardNumber');
    this.cvvControl = this.loginForm.get('cvv');
    this.expMonthControl = this.loginForm.get('expMonth');
    this.expYearControl = this.loginForm.get('expYear');
  }

  ngOnInit() {
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
      case 'passwordConfirmation': {
        this.PasswordConfirmationError = true;
        break;
      }
      case 'cardNumber': {
        this.CardNumberError = true;
        break;
      }
      case 'cvv': {
        this.CvvError = true;
        break;
      }
      case 'expMonth': {
        this.ExpMonthError = true;
        break;
      }
      case 'expYear': {
        this.ExpYearError = true;
        break;
      }
    }
  }

  onSubmit() {
    const formModel = {
      id: this.loginForm.value.id,
      password: this.loginForm.value.password,
      passwordConfirmation: this.loginForm.value.passwordConfirmation,
      cardNumber: this.loginForm.value.cardNumber,
      cvv: this.loginForm.value.cvv,
      expMonth: this.loginForm.value.expMonth,
      expYear: this.loginForm.value.expYear,
    } as Registration;

    console.log(formModel);
    // this.store.dispatch(new loginAction.LoginAction(formModel));
  }

  // TODO registration action flow:
  // (Dispatch) -> Action -> effect -> service -> reducer -> store

}
