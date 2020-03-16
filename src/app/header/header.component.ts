import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { BooksService } from '../services/book.service';
import { BlogService } from '../services/blog-message.service';
import { ProductService } from '../services/product.service';
import {
  Platform,
} from '@angular/cdk/platform';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  public isMenuCollapsed = true;
  isMobile: boolean = false;
  lengthShoppingCard: number = 0;
  colorNavBar: boolean = true;
  user: User = {
    name: 'default',
    email: '',
    uid: "",
    isAuth: false,
    photo: "",
    phone: ""
  };
  userSubscription: Subscription;
  SubscriptionShoppingCard: Subscription



  constructor(
    public platform: Platform,
    private authService: AuthService,
    private router: Router,
    private books: BooksService,
    private blog: BlogService,
    private product: ProductService) {

    this.userSubscription = this.authService.userSubject.subscribe(
      (user: User) => {
        console.log("%c Header component ", "color: orange", user);
        this.user = user;
      }
    );

    this.SubscriptionShoppingCard = this.product.shoppingCardSubject.subscribe(
      (products: any[]) => {
        this.lengthShoppingCard = products.length;
      }
    );

    this.product.emitShoppingCard();

    this.authService.getUserAuth();
    this.books.getBooks();
    this.blog.getMessages();
    this.product.getProducts();
    this.product.getShoppingCard();

    console.log(platform);
    this.isMobile = platform.ANDROID || platform.IOS;
  }

  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    console.log(5);
    event.target.innerWidth <= 990 ? this.isMobile = true : this.isMobile = false;
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    let element = document.querySelector('.navbar');
    if (window.pageYOffset > element.clientHeight) {
      this.colorNavBar = false;
    } else {
      //element.classList.remove('navbar-inverse');
      this.colorNavBar = true;
    }
  }

  onSignOut() {
    this.authService.signOutUser();
    this.router.navigate(['/auth', 'signin']);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }


}
