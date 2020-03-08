import { Component, OnInit } from '@angular/core';
import { FilmService } from '../../services/film-api.service';
import { Subscription } from 'rxjs';
import { Film } from '../../models/film.model';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-film-liked',
  templateUrl: './film-liked.component.html',
  styleUrls: ['./film-liked.component.css']
})
export class FilmLikedComponent implements OnInit {

  filmsLikedSubscription: Subscription;
  films: Film[];

  dataReceive: boolean = false;

  constructor(private FilmService: FilmService) {
  
  }

  ngOnInit() {
    this.filmsLikedSubscription = this.FilmService.filmLikedSubject.subscribe(
      (films: Film[]) => {
        this.films = films;
        this.dataReceive = true;
      }
    );
    this.FilmService.emitFilmSubject();
  }


  getImage(name){
    return 'https://image.tmdb.org/t/p/w300' + name
  }


  onLikePressed(id: number){
    this.FilmService.likeFilm(id);
  }

  ngOnDestroy() {
    this.filmsLikedSubscription.unsubscribe();
  }

}
