

import { Component, OnInit, DoCheck } from '@angular/core';
import { BookModel } from '../book.model';
import { BookCrudService } from '../book-crud.service';

@Component({
  selector: 'app-book-crud-list',
  templateUrl: './book-crud-list-gallery.component.html',
  styleUrls: ['./book-crud-list.component.css']
})
export class BookCrudListComponent implements DoCheck {
  
  private books:any[];
  private start: number = 0;
  private totalRecords: number;
  private page: number = 1;
  private pageSize: number = 9;
  
  
  constructor(private bookCrudService: BookCrudService) { 
  }
	
  	ngDoCheck() {
    this.getBooks(this.start, this.pageSize);
    this.getBookNum();
  }

  getBooks(start: number, pageSize: number, query?: number){
    console.info('Get Service, getting elements');
    this.bookCrudService.searchBooks(start, pageSize).subscribe(data => { this.books = data },
    error => {
      console.error(error);
    })
  }


  deleteBook(id: number){
    console.info('Delete Service, deleting '+ id);
    this.bookCrudService.deleteBook(id).subscribe(result => { console.log("Deleted item succesfully") },
     error => {
       console.error(error)
     });
  }

  getBookNum(){
    console.info('Get Service, getting total num');
    this.bookCrudService.searchNumBooks().subscribe(num => this.totalRecords = num, error => console.log(error));
  }

  private pageChanged(obj: any){
    this.start = obj.page * obj.pageSize - obj.pageSize;
    this.pageSize = obj.pageSize;
    this.getBooks(this.start,this.pageSize);
  }





}

