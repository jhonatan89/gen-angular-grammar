import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ServiceMainLocator } from './service-locator-main';
import { routes as libraryChildRoutes } from './library/library.module';
import { LibraryComponent } from './library/library.component';
import { LibraryModule } from './library/library.module';


const routes: Routes = [
{path: '', redirectTo: 'library', pathMatch: 'full'},	{path: 'library', component:LibraryComponent, children: libraryChildRoutes }
]


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    NgbModule.forRoot(),
    LibraryModule   ],
  providers: [ServiceMainLocator],
  bootstrap: [AppComponent]
})
export class AppModule { }

