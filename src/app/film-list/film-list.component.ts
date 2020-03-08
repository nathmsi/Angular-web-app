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

  dataReceive: boolean = false;
  limiteTexte: number = 350;

  constructor(private FilmService: FilmService) {
  
  }

  ngOnInit() {
    this.filmsSubscription = this.FilmService.filmSubject.subscribe(
      (films: Film[]) => {
        this.films = films;
        this.dataReceive = true;
        console.log(films);
      }
    );
    this.FilmService.emitFilmSubject();
    this.FilmService.getFilmsFromApiWithSearchedText('harry potter');
  }

  onSubmit(form: NgForm){
    this.dataReceive = false;
    this.films = [];
    const film = form.value['film'];
    this.FilmService.getFilmsFromApiWithSearchedText(film);
  }

  getImage(name){
    return 'https://image.tmdb.org/t/p/w300' + name
  }

  onKeydown(event,form: NgForm) {
    if (event.key === "Enter") {
      this.onSubmit(form);
    }
  }

  onLikePressed(id: number){
    this.FilmService.likeFilm(id);
  }

  onReadMore(){
    this.limiteTexte = this.limiteTexte * 2;
  }

  onReadLess(){
      this.limiteTexte = 350;
  }

  ngOnDestroy() {
    this.filmsSubscription.unsubscribe();
  }

}
