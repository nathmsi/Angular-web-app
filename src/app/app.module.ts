import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule ,FormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

// material ui
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatChipsModule} from '@angular/material/chips';


// services
import { AuthService } from './services/auth.service'
import { AuthGuardService } from './services/auth-guard.service'
import { BooksService } from './services/book.service';
import { FilmService } from './services/film-api.service';
import { BlogService } from './services/blog-message.service';
import { LocalStorageService } from './services/storageLocal.service';
import { ProductService } from './services/product.service';

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
import { AccountComponent } from './account/account.component';
import { FilmViewComponent } from './film-list/film-view/film-view.component';
import { BookViewComponent } from './book-list/book-view/book-view.component';
import { ProductComponent } from './product/product.component';
import { ProductCardsComponent } from './product/product-cards/product-cards.component';
import { CardViewComponent } from './product/product-cards/card-view/card-view.component';
import { ProductFormComponent } from './product/product-form/product-form.component'
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';


const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'books',  component: BookListComponent },
  { path: 'books/new', canActivate: [AuthGuardService], component: BookFormComponent },
  { path: 'books/view/:id',  component: SingleBookComponent },
  { path: 'films', component: FilmListComponent },
  { path: 'films-liked',  component: FilmLikedComponent },
  { path: 'blog', canActivate: [AuthGuardService] , component: BlogComponent },
  { path: 'account', canActivate: [AuthGuardService] , component: AccountComponent },
  { path: 'product', component: ProductComponent },
  { path: 'product/new', component: ProductFormComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'about', component: AboutComponent },
  { path: '', component: HomeComponent },
  // { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: '**', redirectTo: 'books' }
];

const settingToastr: any = {
  timeOut: 2000,
  positionClass: 'toast-top-center',
  preventDuplicates: true,
}


const MAtModule = [
    MatBadgeModule,
    MatSelectModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule,
    MatChipsModule
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
    BlogComponent,
    AccountComponent,
    FilmViewComponent,
    BookViewComponent,
    ProductComponent,
    ProductCardsComponent,
    CardViewComponent,
    ProductFormComponent,
    ShoppingCartComponent
  ],
  imports: [
    ...MAtModule,
    CommonModule,
    BrowserModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    StorageServiceModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(settingToastr), 
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    AuthService,
    BooksService,
    FilmService,
    BlogService,
    LocalStorageService,
    AuthGuardService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
