/*
  Mock Service Enabled
*/
import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BookModel } from './book.model';
import { LocatorBookCrudService } from './book-crud-locator.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class BookCrudService {

  private headers: Headers;
  private options: RequestOptions;
  constructor(private http: Http, private urlService: LocatorBookCrudService) {
    this.headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json, text/plain' });
    this.options = new RequestOptions({ headers: this.headers, withCredentials: true });
  }

  createBook(book:BookModel) {
    this.saveItemToListInLocalStorage(book);
    let observable = new Observable(observer => { observer.next(book), observer.complete() });
    return observable;
  }

  updateBook(book:BookModel) {
    this.updateItemToListInLocalStorage(book);
    let observable = new Observable(observer => { observer.next(book), observer.complete() });
    return observable;
  }

  searchBooks(start: number, limit: number, query?: string) {
    if (!this.getListFromLocalStorage()) {
      let params = new URLSearchParams();
      params.set('offset', start.toString());
      params.set('limit', limit.toString());
      return this.http.get(this.urlService.getUrlList(), { search: params })
        .map(data => this.extractData(data))
        .catch(this.handleError);
    } else {
      let observable: Observable<Array<BookModel>> = new Observable(observer => { observer.next(this.getListFromLocalStorage().slice(start, start+limit)), observer.complete() });
      return observable;
    }
  }

  getBook(id: number) {
    let observable: Observable<BookModel> = new Observable(observer => { observer.next(this.getItemFromList(id)), observer.complete() });
    return observable;
  }

  searchNumBooks() {
    let observable: Observable<number> = new Observable(observer => { observer.next(this.getListFromLocalStorage() ? this.getListFromLocalStorage().length: 0), observer.complete() })
    return observable;
  }


  deleteBook(id: number) {
    this.deleteItemToListInLocalStorage(id);
    let observable: Observable<number> = new Observable(observer => { observer.next(id), observer.complete() });
    return observable;
  }


  private getListFromLocalStorage(): BookModel[] {
    return localStorage.getItem('books') ? JSON.parse(localStorage.getItem('books')): undefined;
  }

  private getItemFromList(id: number): BookModel {
    let bookList: BookModel[] = this.getListFromLocalStorage();
    let bookInList = bookList.find(elm => elm.id == id);
    return bookInList;
  }

  private saveItemToListInLocalStorage(book: BookModel): void {
    let bookList: BookModel[] = this.getListFromLocalStorage();
    bookList.push(book);
    this.saveListInLocalStorage(bookList);
  }

  private deleteItemToListInLocalStorage(id: number): void {
    let bookList: BookModel[] = this.getListFromLocalStorage();
    let bookToDelete: BookModel = this.getItemFromList(id);
    let index = bookList.findIndex(elm => elm.id == bookToDelete.id);
    bookList.splice(index, 1);
    this.saveListInLocalStorage(bookList);
  }

  private saveListInLocalStorage(bookList: BookModel[]) {
    let body = JSON.stringify(bookList);
    localStorage.setItem('books', body);
  }

  private updateItemToListInLocalStorage(book: BookModel) {
    let bookList: BookModel[] = this.getListFromLocalStorage();
    if(this.getItemFromList(book.id)){
      let index = bookList.findIndex(elm => elm.id == book.id);
      bookList.splice(index, 1, book);
    };
    this.saveListInLocalStorage(bookList);
  }


  private extractData(res: Response) {
    let body:BookModel[] = res.json();
    this.saveListInLocalStorage(body);
    return body || {};
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText || 'Server error');
  }


}


