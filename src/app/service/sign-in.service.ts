import { Injectable } from '@angular/core';
import { AppGlobal } from '../shared/app-global';
import { Headers, Http } from '@angular/http';
import { User } from '../model/user';

@Injectable()
export class SignInService {
  private signInUrl = `${AppGlobal.getInstance().appURL}/user/token`;  // URL to web api

  constructor(private http: Http) { }

  signin(uid:string,password:string): Promise<User> {
    return this.http
      .post(this.signInUrl, { headers: this.httpHeaders() })
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  private httpHeaders(): Headers {
    var headers = new Headers({ 'Content-Type': 'application/json' });
    var token = AppGlobal.getInstance().GetLocalToken();
    headers.append('x-auth-token', token);
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
