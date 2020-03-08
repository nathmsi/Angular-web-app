import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Film } from '../models/film.model';


@Injectable()
export class FilmService {

    films: Film[] = [];
    filmsLiked: Film[] = [];
    filmSubject = new Subject<Film[]>();
    filmLikedSubject = new Subject<Film[]>();
    idFilmLiked: Number[] = [];

    API_TOKEN = "89dbede4c7d0f1bb758bd3e5e9398c10";

    constructor(private httpClient: HttpClient) {
    }

    emitFilmSubject() {
        this.films.forEach(film => {
            film.liked = this.isFilmLiked(film.id);
        });
        this.filmSubject.next(this.films.slice());
        this.filmLikedSubject.next(this.filmsLiked.slice())
    }


    getFilmsFromApiWithSearchedText(text) {
        const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + this.API_TOKEN + '&language=fr&query=' + text;
        this.httpClient
            .get<any>(url)
            .subscribe(
                (response) => {
                    this.films = response.results;
                    this.emitFilmSubject();
                },
                (error) => {
                    console.log('error get Films ' + error);
                }
            )
    }

    isFilmLiked(id) {
        return this.idFilmLiked.indexOf(id) === -1 ? false : true;
    }

    likeFilm(id: number) {
        var index = this.idFilmLiked.indexOf(id);
        if (index !== -1) {
            this.idFilmLiked.splice(index, 1);
            this.filmsLiked = this.filmsLiked.filter(function (element) { return element.id !== id; });
        } else {
            this.idFilmLiked.push(id);
            this.filmsLiked.push(
                this.films.find((film) => film.id === id)
            );
        }
        this.emitFilmSubject();
    }


}
