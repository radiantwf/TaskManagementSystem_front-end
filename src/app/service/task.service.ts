import { Injectable } from '@angular/core';
import { AppGlobal } from '../shared/app-global';
import { Task } from '../model/task';
import { TaskCounts } from '../model/counts';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TaskService {
  private tasksUrl = `${AppGlobal.getInstance().appURL}/task`;  // URL to web api
  private tasksCountsUrl = `${AppGlobal.getInstance().appURL}/task/counts`;
  constructor(private http: Http) { }

  getTasks(pageNumber): Promise<Task[]> {
    const url = `${this.tasksUrl}/?pagesize=${AppGlobal.getInstance().pageSize}&page=${pageNumber}`;
    console.log(url);
    return this.http.get(url, { headers: this.httpHeaders() })
      .toPromise()
      .then(response => response.json().data as Task[])
      .catch(this.handleError);
  }

  getTask(id: string): Promise<Task> {
    const url = `${this.tasksUrl}/${id}`;
    return this.http.get(url, { headers: this.httpHeaders() })
      .toPromise()
      .then(response => response.json().data as Task)
      .catch(this.handleError);
  }

  delete(id: string): Promise<void> {
    const url = `${this.tasksUrl}/${id}`;
    return this.http.delete(url, { headers: this.httpHeaders() })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(task: Task): Promise<Task> {
    return this.http
      .post(this.tasksUrl, JSON.stringify(task), { headers: this.httpHeaders() })
      .toPromise()
      .catch(this.handleError);
  }

  update(task: Task): Promise<Task> {
    const url = `${this.tasksUrl}/${task.id}`;
    return this.http
      .put(url, JSON.stringify(task), { headers: this.httpHeaders() })
      .toPromise()
      .then(() => task)
      .catch(this.handleError);
  }

  getTaskCounts(): Observable<any> {
    return this.http.get(this.tasksCountsUrl, { headers: this.httpHeaders() })
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
