import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'iph-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  years = ['2017', '2018', '2019', '2020', '2021', '2022'];

  constructor() { }

  ngOnInit() {
  }

  onlyNumbers(value) {
    if (value.charCode <= 48 && value.charCode >= 57 ) {
      return false;
    }
  }

}
