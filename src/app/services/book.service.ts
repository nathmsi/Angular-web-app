import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Book } from '../models/book.model';

import * as firebase from 'firebase/app';

import 'firebase/database'; 
import 'firebase/storage';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';



@Injectable()
export class BooksService {

  books: Book[] = [];
  booksSubject = new Subject<Book[]>();
  userUid: string = "";
  userSubscription: Subscription;

  constructor(private authService: AuthService) {
    this.userSubscription = this.authService.userSubject.subscribe(
      (user: User) => {
        this.userUid = user.uid;
      }
    );
    this.authService.emitUser();
  }

  emitBooks() {
    this.booksSubject.next(this.books);
  }

  saveBooks() {
    firebase.database().ref('/books').set(this.books);
  }

  getBooks() {
    console.log("%c getBooks()  ", "color:yellow" );
    firebase.database().ref('/books')
      .on('value', (data) => {
        this.books = data.val() ? data.val() : [];
        this.emitBooks();
      }
      );
  }

  getSingleBook(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/books/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewBook(newBook: Book) {
    this.books.push(newBook);
    console.log("%c createNewBook => ", "color:yellow" , newBook);
    this.saveBooks();
    this.emitBooks();
  }

  removeBook(book: Book) {
    if(book.photo) {
      const storageRef = firebase.storage().refFromURL(book.photo);
      storageRef.delete().then(
        () => {
          console.log("%c Photo removed! => ", "color:yellow" );
        },
        (error) => {
          console.log("%c Photo removed error => ", "color:red" , error );
        }
      );
    }
    const bookIndexToRemove = this.books.findIndex(
      (bookEl) => {
        if(bookEl === book) {
          return true;
        }
      }
    );
    this.books.splice(bookIndexToRemove, 1);
    console.log("%c book removed! => ", "color:yellow", book );
    this.saveBooks();
    this.emitBooks();
}

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log("%c Chargement… => ", "color:yellow" );
          },
          (error) => {
            console.log("%c Erreur Chargement… => ", "color:yellow" , error );
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          }
        );
      }
    );
  }





}