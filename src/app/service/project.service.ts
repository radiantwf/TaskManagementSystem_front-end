import { Injectable } from '@angular/core';
import { AppGlobal } from '../shared/app-global';
import { Project } from '../model/project';
import { ProjectCounts } from '../model/counts';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProjectService {
  private projectsUrl = `${AppGlobal.getInstance().appURL}/project`;  // URL to web api
  private projectsCountsUrl = `${AppGlobal.getInstance().appURL}/project/counts`;
  constructor(private http: Http) { }

  getAllProjects(): Promise<Project[]> {
    let url = `${this.projectsUrl}/all`;
    return this.http.get(url, { headers: this.httpHeaders() })
      .toPromise()
      .then(response => response.json().data as Project[])
      .catch(this.handleError);
  }
  getProjects(searchCriteria, pageNumber): Promise<Project[]> {
    let url = `${this.projectsUrl}/?pagesize=${AppGlobal.getInstance().pageSize}&page=${pageNumber}`;
    url += (searchCriteria == null ? '' : 'searchCriteria = ' + searchCriteria);
    return this.http.get(url, { headers: this.httpHeaders() })
      .toPromise()
      .then(response => response.json().data as Project[])
      .catch(this.handleError);
  }

  getProject(id: string): Promise<Project> {
    const url = `${this.projectsUrl}/${id}`;
    return this.http.get(url, { headers: this.httpHeaders() })
      .toPromise()
      .then(response => response.json().data as Project)
      .catch(this.handleError);
  }

  delete(id: string): Promise<void> {
    const url = `${this.projectsUrl}/${id}`;
    return this.http.delete(url, { headers: this.httpHeaders() })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(project: Project): Promise<Project> {
    return this.http
      .post(this.projectsUrl, JSON.stringify(project), { headers: this.httpHeaders() })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  update(project: Project): Promise<Project> {
    const url = `${this.projectsUrl}/${project.id}/update`;
    return this.http
      .put(url, JSON.stringify(project), { headers: this.httpHeaders() })
      .toPromise()
      .then(() => project)
      .catch(this.handleError);
  }
  getProjectCounts(): Observable<any> {
    return this.http.get(this.projectsCountsUrl, { headers: this.httpHeaders() })
      .map(response => response.json().data as ProjectCounts)
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
