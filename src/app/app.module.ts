import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule ,FormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


// components
import { AppComponent } from './app.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookFormComponent } from './book-list/book-form/book-form.component';
import { SingleBookComponent } from './book-list/single-book/single-book.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog/blog.component';
import { AboutComponent } from './about/about.component';
import { FilmListComponent } from './film-list/film-list.component';
import { FilmLikedComponent } from './film-list/film-liked/film-liked.component';

// services
import { AuthService } from './services/auth.service'
import { AuthGuardService } from './services/auth-guard.service'
import { BooksService } from './services/book.service';
import { FilmService } from './services/film-api.service';
import { BlogService } from './services/blog-message.service';



const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'books',  component: BookListComponent },
  { path: 'books/new', canActivate: [AuthGuardService], component: BookFormComponent },
  { path: 'books/view/:id',  component: SingleBookComponent },
  { path: 'films', component: FilmListComponent },
  { path: 'films/liked',  component: FilmLikedComponent },
  { path: 'blog', canActivate: [AuthGuardService] , component: BlogComponent },
  { path: 'about', component: AboutComponent },
  { path: '', component: HomeComponent },
  // { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: '**', redirectTo: 'books' }
];




@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    BookListComponent,
    BookFormComponent,
    SingleBookComponent,  
    FooterComponent,
    HeaderComponent,
    FilmListComponent,
    FilmLikedComponent,
    AboutComponent,
    HomeComponent,
    BlogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    AuthService,
    BooksService,
    FilmService,
    BlogService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
