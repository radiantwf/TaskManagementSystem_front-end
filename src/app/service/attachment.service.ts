import { Injectable } from '@angular/core';
import { AppGlobal } from '../shared/app-global';
import { Attachment } from '../model/attachment';

import { UserService } from './user.service';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AttachmentService {

  private attachmentUrl = `${AppGlobal.getInstance().appURL}/attachment`;  // URL to web api

  constructor(private http: Http, private userService: UserService) { }

  getAttachmentsById(id: string): Promise<Attachment[]> {
    const url = `${this.attachmentUrl}/${id}`;
    return this.http.get(url, { headers: this.httpHeaders() })
      .toPromise()
      .then(response => response.json().data as Attachment[])
      .catch(this.handleError);
  }

  upload(id: string, file: File): Promise<any> {
    const url = `${this.attachmentUrl}/file/${id}`;
    const fd = new FormData();
    fd.append('tid', id);
    fd.append('file', file);
    return this.http
      .post(url, fd, { headers: this.httpUploadHeaders() })
      .toPromise()
      .then(res => {
        if (!res.ok) {
          throw new Error('Response返回值不正确。');
        }
        return res.json().error as string;
      })
      .then(err => {
        if (err !== '') {
          throw new Error(err);
        }
      })
      .catch(this.handleError);
  }

  delete(fid: string): Promise<any> {
    const url = `${this.attachmentUrl}/file/${fid}`;
    return this.http.delete(url, { headers: this.httpHeaders() })
      .toPromise()
      .then(res => {
        if (!res.ok) {
          throw new Error('Response返回值不正确。');
        }
        return res.json().error as string;
      })
      .then(err => {
        if (err !== '') {
          throw new Error(err);
        }
      })
      .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  private httpHeaders(): Headers {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const token = this.userService.getLocalToken();
    if (token != null && token !== '') {
      headers.append('X-Auth-Token', token);
    }
    headers.append('Cache-Control', 'no-cache');
    headers.append('Pragma', 'no-cache');
    return headers;
  }
  private httpUploadHeaders(): Headers {
    const headers = new Headers();
    const token = this.userService.getLocalToken();
    if (token != null && token !== '') {
      headers.append('X-Auth-Token', token);
    }
    headers.append('Cache-Control', 'no-cache');
    headers.append('Pragma', 'no-cache');
    return headers;
  }
}
