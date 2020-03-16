import { Component, OnInit } from '@angular/core';
import { FilmService } from '../services/film-api.service';
import { Subscription } from 'rxjs';
import { Film } from '../models/film.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})
export class FilmListComponent implements OnInit {
  
  filmsSubscription: Subscription;
  films: Film[];
  filmSearch: string = '';

  dataReceive: boolean = false;
  constructor(private FilmService: FilmService) {
  
  }

  ngOnInit() {
    this.filmsSubscription = this.FilmService.filmSubject.subscribe(
      (films: Film[]) => {
        this.films = films;
        this.dataReceive = true;
        films.length > 0 && console.log("%c FILMS \n array object Film", "color:orange" , films );
      }
    );
    this.filmSearch= 'harry potter';
    this.FilmService.emitFilmSubject();
    this.dataReceive = false;
    this.FilmService.getFilmsFromApiWithSearchedText('harry potter');
  }

  onSubmit(form: NgForm){
    this.dataReceive = false;
    this.films = [];
    const film = form.value['film'];
    this.FilmService.getFilmsFromApiWithSearchedText(film);
  }


  onKeydown(event,form: NgForm) {
    if (event.key === "Enter") {
      this.onSubmit(form);
    }
  }

  


  ngOnDestroy() {
    this.filmsSubscription.unsubscribe();
  }

}
