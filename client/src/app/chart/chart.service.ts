import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Chart } from './chart.model';

import { environment } from '../../environments/environment';

@Injectable()
export class ChartService {

  constructor(
    private http: HttpClient,
  ) { }

  getChart(chartName: String): Observable<Chart[]> {
    return this.http.get(`${environment.backend}/api/graph/${chartName}`, {
      headers: new HttpHeaders().set('access_token', localStorage.getItem('IphUserToken')),
    });
  }
}
