import { Injectable } from '@angular/core';
import { AppGlobal } from '../shared/app-global';
import { Product } from '../model/product';
import { ProductCounts } from '../model/counts';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductService {
  private productsUrl = `${AppGlobal.getInstance().appURL}/product`;  // URL to web api
  private productsCountsUrl = `${AppGlobal.getInstance().appURL}/product/counts`;
  constructor(private http: Http) { }

  getProducts(searchCriteria, pageNumber): Promise<Product[]> {
    let url = `${this.productsUrl}/?pagesize=${AppGlobal.getInstance().pageSize}&page=${pageNumber}`;
    url += (searchCriteria == null ? '' : 'searchCriteria = ' + searchCriteria);
    return this.http.get(url, { headers: this.httpHeaders() })
      .toPromise()
      .then(response => response.json().data as Product[])
      .catch(this.handleError);
  }

  getProduct(id: string): Promise<Product> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.get(url, { headers: this.httpHeaders() })
      .toPromise()
      .then(response => response.json().data as Product)
      .catch(this.handleError);
  }

  delete(id: string): Promise<void> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.delete(url, { headers: this.httpHeaders() })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(product: Product): Promise<Product> {
    return this.http
      .post(this.productsUrl, JSON.stringify(product), { headers: this.httpHeaders() })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  update(product: Product): Promise<Product> {
    const url = `${this.productsUrl}/${product.id}/update`;
    return this.http
      .put(url, JSON.stringify(product), { headers: this.httpHeaders() })
      .toPromise()
      .then(() => product)
      .catch(this.handleError);
  }
  getProductCounts(): Observable<any> {
    return this.http.get(this.productsCountsUrl, { headers: this.httpHeaders() })
      .map(response => response.json().data as ProductCounts)
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
