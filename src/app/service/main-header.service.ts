import { Injectable } from '@angular/core';
import { AppGlobal } from '../shared/app-global';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { TaskCounts } from '../model/counts';
import { UserService } from './user.service';

@Injectable()
export class MainHeaderService {
  private tasksUrl = `${AppGlobal.getInstance().appURL}/task/counts`;
  private projectsUrl = `${AppGlobal.getInstance().appURL}/project/counts`;
  private productsUrl = `${AppGlobal.getInstance().appURL}/product/counts`;

  constructor(private http: Http, private userService: UserService) { }

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
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let token = this.userService.getLocalToken();
    if (token != null && token != "") {
      headers.append('X-Auth-Token', token);
    }
    headers.append('Cache-Control', 'no-cache');
    headers.append('Pragma', 'no-cache');
    return headers
  }
}
