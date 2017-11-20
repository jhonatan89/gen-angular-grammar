

import { Component, OnInit, DoCheck } from '@angular/core';
import { AuthorModel } from '../author.model';
import { AuthorCrudService } from '../author-crud.service';

@Component({
  selector: 'app-author-crud-list',
  templateUrl: './author-crud-list.component.html',
  styleUrls: ['./author-crud-list.component.css']
})
export class AuthorCrudListComponent implements OnInit {
  
  private authors:any[];
  private start: number = 0;
  private totalRecords: number;
  private page: number = 1;
  private pageSize: number = 9;
  
  
  constructor(private authorCrudService: AuthorCrudService) { 
  }
	
	
  ngOnInit() {
    this.getAuthors(this.start, this.pageSize);
    this.getAuthorNum();
  }

  getAuthors(start: number, pageSize: number, query?: number){
    console.info('Get Service, getting elements');
    this.authorCrudService.searchAuthors(start, pageSize).subscribe(data => { this.authors = data },
    error => {
      console.error(error);
    })
  }


  deleteAuthor(id: number){
    console.info('Delete Service, deleting '+ id);
    this.authorCrudService.deleteAuthor(id).subscribe(result => { console.log("Deleted item succesfully") },
     error => {
       console.error(error)
     });
  }

  getAuthorNum(){
    console.info('Get Service, getting total num');
    this.authorCrudService.searchNumAuthors().subscribe(num => this.totalRecords = num, error => console.log(error));
  }

  private pageChanged(obj: any){
    this.start = obj.page * obj.pageSize - obj.pageSize;
    this.pageSize = obj.pageSize;
    this.getAuthors(this.start,this.pageSize);
  }





}

