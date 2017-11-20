
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { SharedModule } from '../../shared/shared.module';
import { LocatorAuthorCrudService } from './author-crud/author-crud-locator.service';
import { AuthorCrudComponent } from './author-crud/author-crud.component';
import { AuthorCrudListComponent } from './author-crud/author-crud-list/author-crud-list.component';
import { AuthorCrudDetailComponent } from './author-crud/author-crud-detail/author-crud-detail.component';
import { AuthorCrudService } from './author-crud/author-crud.service';
export const routes : Routes = [
	  {path:'', redirectTo: 'list', pathMatch: "full"},
	  {path:'list', component:AuthorCrudListComponent},
	  {path:'edit/:id', component:AuthorCrudDetailComponent},
	  {path:'create', component:AuthorCrudDetailComponent}
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
  declarations: [AuthorCrudComponent , AuthorCrudListComponent, AuthorCrudDetailComponent ],
  exports:[ AuthorCrudComponent ],
  providers: [ AuthorCrudService, LocatorAuthorCrudService ]
})
export class AuthorModule { }
