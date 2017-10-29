import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Login, LoginResponse } from './login.model';

import { environment } from '../../environments/environment';

@Injectable()
export class LoginService {

  constructor(
    private http: Http,
  ) { }

  login(loginData: Login): Observable<LoginResponse> {
    return this.http.post(`${environment.backend}/api/user/signin`, loginData)
      .map(res => res.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.json().error || 'Server error');
  }
}
