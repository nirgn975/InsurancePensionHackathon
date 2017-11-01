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
    return this.http.get('assets/data/chart.json')
      .map(res => res.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.json().error || 'Server error');
  }
}
