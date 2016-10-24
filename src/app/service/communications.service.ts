import { Injectable } from '@angular/core';
import { Task } from '../model/task';
import { Communication } from '../model/communication';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CommunicationsService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private communicationsUrl = 'app/communications';  // URL to web api

  constructor(private http: Http) { }

  getCommunications(): Promise<Communication[]> {
    return this.http.get(this.communicationsUrl)
      .toPromise()
      .then(response => response.json().data as Communication[])
      .catch(this.handleError);
  }
  getCommunicationsById(id: string): Promise<Communication[]> {
    return this.getCommunications()
      .then(communications => communications.filter(value => value.id === id));
  }

  create(communication: Communication): Promise<Communication> {
    return this.http
      .post(this.communicationsUrl, JSON.stringify(communication), { headers: this.headers })
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}