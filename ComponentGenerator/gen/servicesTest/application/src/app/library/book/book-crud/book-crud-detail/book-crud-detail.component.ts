
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookModel } from '../book.model';
import { BookCrudService } from '../book-crud.service';

@Component({
  selector: 'app-book-crud-detail',
  templateUrl: './book-crud-detail.component.html',
  styleUrls: ['./book-crud-detail.component.css']
})
export class BookCrudDetailComponent implements OnInit {

  private formGroup: FormGroup;
  private currentId: number;
  private book: BookModel = new BookModel();

  constructor(private _formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private bookCrudService: BookCrudService) {
    this.formGroup = this._formBuilder.group({
nameCtrl: ['', Validators.compose([Validators.required])], editorialCtrl: ['', Validators.compose([Validators.required])], authorCtrl: ['', Validators.compose([Validators.required])], priceCtrl: ['', Validators.compose([Validators.required])] 
    });
  }

  ngOnInit() {
    this.currentId = Number(this.route.snapshot.params['id']);
    if (this.currentId) {
      this.getBookById(this.currentId);
    }
  }

  getBookById(id: number){
    this.bookCrudService.getBook(id).subscribe(data => this.book = data), 
    error => {
      console.error(error);
    };
  }

  saveBook(book: BookModel) {
    if (this.currentId) {
      console.info("Update book =>" + JSON.stringify(book));
      this.bookCrudService.updateBook(book).subscribe(success => {
        console.info(success);
        this.router.navigate(['../../']);
      }, error => {
        console.error(error);
      });
    } else {
      console.info("Save book =>" + JSON.stringify(book));
      this.bookCrudService.createBook(book).subscribe(success => {
        console.info(success);
        this.router.navigate(['../../']);
      }, error => {
        console.error(error);
      });
    }
  }


}
