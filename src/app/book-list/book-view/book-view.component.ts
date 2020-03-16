import { Component, OnInit, Input } from '@angular/core';
import { Book } from 'src/app/models/book.model';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.css']
})
export class BookViewComponent implements OnInit {
  @Input() book: Book;
  
  limiteTexte: number = 250;

  showBook: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onReadMore(){
    this.limiteTexte = this.book.synopsis.length;
  }

  onReadLess(){
      this.limiteTexte = 250;
  }


  isImageLoaded(){
    this.showBook = true;
  }

}
