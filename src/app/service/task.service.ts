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

  getTasks(searchCriteria, searchCriteria2, pageNumber): Promise<Task[]> {
    let url = `${this.tasksUrl}/?pagesize=${AppGlobal.getInstance().pageSize}&page=${pageNumber}`;
    url += ((searchCriteria == null || searchCriteria === undefined || searchCriteria === '')
      ? '' : '&searchCriteria=' + searchCriteria);
    url += ((searchCriteria2 == null || searchCriteria2 === undefined || searchCriteria2 === '')
      ? '' : '&searchCriteria2=' + searchCriteria2);
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

  create(task: Task): Promise<void> {
    return this.http
      .post(this.tasksUrl, JSON.stringify(task), { headers: this.httpHeaders() })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  update(task: Task): Promise<Task> {
    const url = `${this.tasksUrl}/${task.id}/update`;
    return this.http
      .put(url, JSON.stringify(task), { headers: this.httpHeaders() })
      .toPromise()
      .then(() => task)
      .catch(this.handleError);
  }
  refuse(task: Task): Promise<Task> {
    const url = `${this.tasksUrl}/${task.id}/refuse`;
    return this.http
      .put(url, JSON.stringify(task), { headers: this.httpHeaders() })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  strat(task: Task): Promise<Task> {
    const url = `${this.tasksUrl}/${task.id}/start`;
    return this.http
      .put(url, JSON.stringify(task), { headers: this.httpHeaders() })
      .toPromise()
      .then(() => task)
      .catch(this.handleError);
  }
  progress(task: Task): Promise<Task> {
    const url = `${this.tasksUrl}/${task.id}/progress`;
    return this.http
      .put(url, JSON.stringify(task), { headers: this.httpHeaders() })
      .toPromise()
      .then(() => task)
      .catch(this.handleError);
  }
  finish(task: Task): Promise<Task> {
    const url = `${this.tasksUrl}/${task.id}/finish`;
    return this.http
      .put(url, JSON.stringify(task), { headers: this.httpHeaders() })
      .toPromise()
      .then(() => task)
      .catch(this.handleError);
  }
  close(task: Task): Promise<Task> {
    const url = `${this.tasksUrl}/${task.id}/close`;
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
