import { Injectable } from '@angular/core';
import { AppGlobal } from '../shared/app-global';
import { Headers, Http, Response } from '@angular/http';
import { Employee } from '../model/employee';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EmployeeService {
  private employeeUrl = `${AppGlobal.getInstance().appURL}/employee`;  // URL to web api

  constructor(private http: Http) { }

  getEmployee(): Promise<Array<Employee>> {
    return this.http
      .get(this.employeeUrl
      , { headers: this.httpHeaders() })
      .toPromise()
      .then(response => response.json().data as Array<Employee>)
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const code = error.status;
      if (code === 401) {
        return Observable.create()
      }
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  private httpHeaders(): Headers {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let token = AppGlobal.getInstance().getLocalToken();
    if (token != null && token !== '') {
      headers.append('X-Auth-Token', token);
    }
    headers.append('Cache-Control', 'no-cache');
    headers.append('Pragma', 'no-cache');
    return headers;
  }
}
