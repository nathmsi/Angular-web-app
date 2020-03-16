import { Component, OnDestroy, OnInit } from '@angular/core';
import { BooksService } from '../services/book.service';
import { Book } from '../models/book.model';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})

export class BookListComponent implements OnInit, OnDestroy {

  books: Book[];
  booksSubscription: Subscription;
  dataReceive: boolean = false;
  limiteTexte: number = 350;

  constructor(private booksService: BooksService, private router: Router) {
  }

  ngOnInit() {
    this.booksSubscription = this.booksService.booksSubject.subscribe(
      (books: Book[]) => {
        this.books = books;
        this.dataReceive = true;
        books.length > 0 && console.log("%c BOOKS \n array object Book", "color:orange" , books );
      }
    );
    this.booksService.emitBooks();
  }

  onNewBook() {
    this.router.navigate(['/books', 'new']);
  }

  onDeleteBook(book: Book) {
    this.booksService.removeBook(book);
  }

  onViewBook(id: number) {
    this.router.navigate(['/books', 'view', id]);
  }

  onReadMore(){
    this.limiteTexte = this.limiteTexte * 2;
  }

  onReadLess(){
      this.limiteTexte = 350;
  }
  
  ngOnDestroy() {
    this.booksSubscription.unsubscribe();
  }
}