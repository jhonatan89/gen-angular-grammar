import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'



@Injectable()
export class   SearchComboBoxUniversityService {

  constructor(private http: Http) { }


  public getAllUniversities(name: string, searchParams?: any): Observable<any>{
    let params = new URLSearchParams();
    if(name) { params.set('query', name) };
    if(searchParams){ searchParams.forEach(queryParam => params.set(queryParam.nameParam, queryParam.value)) };
    return this.http.get("searchUniversitiesServlet",{ search: params })
               .map(this.extractData)
               .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }
  
  private handleError(error: Response){ 
    return Observable.throw(error.statusText || 'Server error');
  }



}