import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { LibraryComponent } from './library.component';
import { BookModule, routes as bookChildRoutes } from './book/book.module';
import { BookCrudComponent } from './book/book-crud/book-crud.component';
import { AuthorModule, routes as authorChildRoutes } from './author/author.module';
import { AuthorCrudComponent } from './author/author-crud/author-crud.component';
import { SharedModule } from '../shared/shared.module';


export const routes: Routes = [
  {path: '', redirectTo: 'book', pathMatch: 'full' },
  {path: 'book', component:BookCrudComponent, children: bookChildRoutes },  {path: 'author', component:AuthorCrudComponent, children: authorChildRoutes }]


@NgModule({
  imports: [
    NgbModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
BookModule ,AuthorModule   ],
  declarations: [LibraryComponent]
})
export class LibraryModule { }

