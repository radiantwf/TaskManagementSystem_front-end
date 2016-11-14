import { Injectable } from '@angular/core';
import { AppGlobal } from '../shared/app-global';
import { Headers, Http, Response } from '@angular/http';
import { User } from '../model/user';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
  private signInUrl = `${AppGlobal.getInstance().appURL}/user/signin`;  // URL to web api
  private userUrl = `${AppGlobal.getInstance().appURL}/user`;  // URL to web api

  constructor(private http: Http) { }

  signin(uid: string, password: string): Observable<User> {
    return this.http
      .post(this.signInUrl, JSON.stringify({ "uid": uid, "password": password })
      , { headers: this.httpHeaders() })
      .map(response => response.json().data as User)
      .catch(this.handleError);
  }

  getUserInfo(): Observable<User> {
    return this.http
      .get(this.userUrl
      , { headers: this.httpHeaders() })
      .map(response => response.json().data as User)
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const code = error.status;
      if (code == 401) {
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
    var headers = new Headers({ 'Content-Type': 'application/json' });
    var token = AppGlobal.getInstance().getLocalToken();
    if (token != null && token != "") {
      headers.append('X-Auth-Token', token);
    }
    return headers
  }
}

  // getCommunicationsById(id: string): Promise<Communication[]> {
  //   if (this.communicationsUrl === 'app/communication') {
  //     return this.http.get(this.communicationsUrl, { headers: this.httpHeaders() })
  //       .toPromise()
  //       .then(response => response.json().data as Communication[])
  //       .then(communications => communications.filter(value => value.relevantId === id))
  //       .catch(this.handleError);
  //   }
  //   const url = `${this.communicationsUrl}/${id}`;
  //   return this.http.get(url, { headers: this.httpHeaders() })
  //     .toPromise()
  //     .then(response => response.json().data as Communication[])
  //     .catch(this.handleError);
  // }
