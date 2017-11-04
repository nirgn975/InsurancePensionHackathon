import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Registration, RegistrationResponse } from './registration.model';

import { environment } from '../../environments/environment';

@Injectable()
export class RegistrationService {

  constructor(
    private http: Http,
  ) { }

  newUserRegistration(registrationData: Registration): Observable<RegistrationResponse> {
    console.log("Service is running");
    return this.http.post(`${environment.backend}/api/user`, registrationData)
      .map(res => res.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.json().error || 'Server error');
  }
}
