
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorModel } from '../author.model';
import { AuthorCrudService } from '../author-crud.service';

@Component({
  selector: 'app-author-crud-detail',
  templateUrl: './author-crud-detail.component.html',
  styleUrls: ['./author-crud-detail.component.css']
})
export class AuthorCrudDetailComponent implements OnInit {

  private formGroup: FormGroup;
  private currentId: number;
  private author: AuthorModel = new AuthorModel();

  constructor(private _formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authorCrudService: AuthorCrudService) {
    this.formGroup = this._formBuilder.group({
nameCtrl: ['', Validators.compose([Validators.required])], ageCtrl: ['', Validators.compose([Validators.required])], profileCtrl: ['', Validators.compose([])] 
    });
  }

  ngOnInit() {
    this.currentId = Number(this.route.snapshot.params['id']);
    if (this.currentId) {
      this.getAuthorById(this.currentId);
    }
  }

  getAuthorById(id: number){
    this.authorCrudService.getAuthor(id).subscribe(data => this.author = data), 
    error => {
      console.error(error);
    };
  }

  saveAuthor(author: AuthorModel) {
    if (this.currentId) {
      console.info("Update author =>" + JSON.stringify(author));
      this.authorCrudService.updateAuthor(author).subscribe(success => {
        console.info(success);
        this.router.navigate(['../../']);
      }, error => {
        console.error(error);
      });
    } else {
      console.info("Save author =>" + JSON.stringify(author));
      this.authorCrudService.createAuthor(author).subscribe(success => {
        console.info(success);
        this.router.navigate(['../../']);
      }, error => {
        console.error(error);
      });
    }
  }


}
