import { Injectable } from '@angular/core';
import { AppGlobal } from '../shared/app-global';

import { Communication } from '../model/communication';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CommunicationsService {

  private communicationsUrl = `${AppGlobal.getInstance().appURL}/communication`;  // URL to web api

  constructor(private http: Http) { }

  getCommunicationsById(id: string): Promise<Communication[]> {
    if (this.communicationsUrl === 'app/communication') {
      return this.http.get(this.communicationsUrl, { headers: this.httpHeaders() })
        .toPromise()
        .then(response => response.json().data as Communication[])
        .then(communications => communications.filter(value => value.relevantId === id))
        .catch(this.handleError);
    }
    const url = `${this.communicationsUrl}/${id}`;
    return this.http.get(url, { headers: this.httpHeaders() })
      .toPromise()
      .then(response => response.json().data as Communication[])
      .catch(this.handleError);
  }

  create(communication: Communication): Promise<Communication> {
    return this.http
      .post(this.communicationsUrl, JSON.stringify(communication), { headers: this.httpHeaders() })
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  private httpHeaders(): Headers {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let token = AppGlobal.getInstance().getLocalToken();
    if (token != null && token != "") {
      headers.append('X-Auth-Token', token);
    }
    headers.append('Cache-Control', 'no-cache');
    headers.append('Pragma', 'no-cache');
    return headers
  }
}
