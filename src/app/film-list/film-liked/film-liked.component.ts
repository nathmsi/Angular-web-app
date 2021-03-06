import { Component, OnInit } from '@angular/core';
import { FilmService } from '../../services/film-api.service';
import { Subscription } from 'rxjs';
import { Film } from '../../models/film.model';


@Component({
  selector: 'app-film-liked',
  templateUrl: './film-liked.component.html',
  styleUrls: ['./film-liked.component.css']
})
export class FilmLikedComponent implements OnInit {

  filmsLikedSubscription: Subscription;
  films: Film[] = [];

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
    this.FilmService.getLikeFilm();
    this.dataReceive = false;
    this.FilmService.emitFilmSubject();
  }




  ngOnDestroy() {
    this.filmsLikedSubscription.unsubscribe();
  }

}
