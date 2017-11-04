import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


import { Login, LoginResponse } from './login.model';

import { environment } from '../../environments/environment';

@Injectable()
export class LoginService {

  constructor(
    private http: HttpClient,
  ) { }

  login(loginData: Login): Observable<LoginResponse> {
    return this.http.post(`${environment.backend}/api/auth/signin`, loginData);
  }
}
