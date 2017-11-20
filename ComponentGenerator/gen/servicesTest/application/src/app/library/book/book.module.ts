
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { SharedModule } from '../../shared/shared.module';
import { LocatorBookCrudService } from './book-crud/book-crud-locator.service';
import { BookCrudComponent } from './book-crud/book-crud.component';
import { BookCrudListComponent } from './book-crud/book-crud-list/book-crud-list.component';
import { BookCrudDetailComponent } from './book-crud/book-crud-detail/book-crud-detail.component';
import { BookCrudService } from './book-crud/book-crud.service';
export const routes : Routes = [
	  {path:'', redirectTo: 'list', pathMatch: "full"},
	  {path:'list', component:BookCrudListComponent},
	  {path:'edit/:id', component:BookCrudDetailComponent},
	  {path:'create', component:BookCrudDetailComponent}
]

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    HttpModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [BookCrudComponent , BookCrudListComponent, BookCrudDetailComponent ],
  exports:[ BookCrudComponent ],
  providers: [ BookCrudService, LocatorBookCrudService ]
})
export class BookModule { }
