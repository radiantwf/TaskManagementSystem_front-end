import { Injectable } from '@angular/core';
import { AppGlobal } from '../shared/app-global';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { TaskCounts } from '../model/counts';

@Injectable()
export class MainHeaderService {
  private tasksUrl = `${AppGlobal.getInstance().appURL}/task/counts`;
  private projectsUrl = `${AppGlobal.getInstance().appURL}/project/counts`;
  private productsUrl = `${AppGlobal.getInstance().appURL}/product/counts`;

  constructor(private http: Http) { }

  getTaskCounts(): Observable<any> {
    return this.http.get(this.tasksUrl, { headers: this.httpHeaders() })
      .map(response => response.json().data as TaskCounts)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  private httpHeaders(): Headers {
    var headers = new Headers({ 'Content-Type': 'application/json' });
    var token = AppGlobal.getInstance().getLocalToken();
    if (token != null && token != "") {
      headers.append('X-Auth-Token', token);
    }
    return headers
  }
}
