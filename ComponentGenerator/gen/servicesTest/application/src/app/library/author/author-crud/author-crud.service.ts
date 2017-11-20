import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthorModel } from './author.model';
import { LocatorAuthorCrudService } from './author-crud-locator.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class AuthorCrudService {

  private headers: Headers;
  private options: RequestOptions;
  constructor(private http: Http, private urlService: LocatorAuthorCrudService) {
    this.headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json, text/plain'});
    this.options = new RequestOptions({ headers: this.headers,  withCredentials:true});
  }

  createAuthor(author:AuthorModel){
    let body = JSON.stringify(author);
    return this.http.post(this.urlService.getUrlCreate(), body, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }
	
  updateAuthor(author:AuthorModel){
    let body = JSON.stringify(author); 
    return this.http.put(this.urlService.getUrlUpdate(), body, this.options)
    .map(this.extractData)
    .catch(this.handleError);
  }

  searchAuthors(start: number, limit: number, query?: string){
    let params = new URLSearchParams();
    params.set('offset', start.toString());
    params.set('limit', limit.toString());
    return this.http.get(this.urlService.getUrlList(),{search:params})
    .map(this.extractData)
    .catch(this.handleError)  
  }
  
  getAuthor(id: number){
    return this.http.get(this.urlService.getUrlGetItem() + '/' + id)
    .map(this.extractData)
    .catch(this.handleError)
  }

  searchNumAuthors(){
     return this.http.get(this.urlService.getUrlListNum())
     .map(this.extractData)
     .catch(this.handleError)
  }
  
	
  deleteAuthor(id: number){
    return this.http.delete(this.urlService.getUrlDeleteItem() + '/' + id, this.options)
    .map(this.extractData)
    .catch(this.handleError)
  }


  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: Response){ 
    return Observable.throw(error.statusText || 'Server error');
  }


}
