import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Chart } from './chart.model';

import { environment } from '../../environments/environment';

@Injectable()
export class ChartService {

  constructor(
    private http: Http,
  ) { }

  getChart(chartName: String): Observable<Chart[]> {
    const options = this.appendToken();
    return this.http.get(`${environment.backend}/api/graph/${chartName}`, options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  private appendToken(): RequestOptions {
    const headers = new Headers();
    headers.append('access_token', localStorage.getItem('IphUserToken'));
    return new RequestOptions({ headers: headers });
  }

  private handleError(error: Response) {
    return Observable.throw(error.json().error || 'Server error');
  }
}
