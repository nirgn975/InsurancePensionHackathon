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
  registrationForm: FormGroup;
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
    this.registrationForm = this.formBuilder.group({
      id: this.formBuilder.control(null, [Validators.minLength(2), Validators.required]),
      password: this.formBuilder.control(null, [Validators.minLength(2), Validators.required]),
      passwordConfirmation: this.formBuilder.control(null, [Validators.minLength(2), Validators.required]),
      cardNumber: this.formBuilder.control(null, [Validators.minLength(2), Validators.required]),
      cvv: this.formBuilder.control(null, [Validators.minLength(3), Validators.maxLength(3), Validators.required]),
      expMonth: this.formBuilder.control(null, [Validators.required]),
      expYear: this.formBuilder.control(null, [Validators.required]),
    });

    this.idControl = this.registrationForm.get('id');
    this.passwordControl = this.registrationForm.get('password');
    this.passwordConfirmationControl = this.registrationForm.get('passwordConfirmation');
    this.cardNumberControl = this.registrationForm.get('cardNumber');
    this.cvvControl = this.registrationForm.get('cvv');
    this.expMonthControl = this.registrationForm.get('expMonth');
    this.expYearControl = this.registrationForm.get('expYear');
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
      id: this.registrationForm.value.id,
      password: this.registrationForm.value.password,
      passwordConfirmation: this.registrationForm.value.passwordConfirmation,
      cardNumber: this.registrationForm.value.cardNumber,
      cvv: this.registrationForm.value.cvv,
      expMonth: this.registrationForm.value.expMonth,
      expYear: this.registrationForm.value.expYear,
    } as Registration;

    console.log(formModel);
    // this.store.dispatch(new loginAction.LoginAction(formModel));
  }

  // TODO registration action flow:
  // (Dispatch) -> Action -> effect -> service -> reducer -> store

}
