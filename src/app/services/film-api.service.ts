import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';
import { Film } from '../models/film.model';
import { AuthService } from './auth.service';
import { User } from '../models/user.model';
import * as firebase from 'firebase/app';
import { LocalStorageService } from './storageLocal.service';

@Injectable()
export class FilmService {

    films: Film[] = [];
    filmsLiked: Film[] = [];
    filmSubject = new Subject<Film[]>();
    filmLikedSubject = new Subject<Film[]>();
    idFilmLiked: Number[] = [];
    user: User = {
        name: 'default',
        email: '',
        uid: "",
        isAuth: false,
        photo: "",
        phone: ""
    };
    userSubscription: Subscription;

    API_TOKEN = "89dbede4c7d0f1bb758bd3e5e9398c10";


    constructor(private httpClient: HttpClient, private authService: AuthService , private localStorageService: LocalStorageService) {
        this.userSubscription = this.authService.userSubject.subscribe(
            (user: User) => {
                this.user = user;
            }
        );
        this.authService.emitUser();
    }

    emitFilmSubject() {
        this.films.forEach(film => {
            film.liked = this.isFilmLiked(film.id);
        });
        this.filmSubject.next(this.films.slice());
        this.filmLikedSubject.next(this.filmsLiked);
    }


    getFilmsFromApiWithSearchedText(text: string) {
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

    isFilmLiked(id: number) {
        return this.filmsLiked.findIndex((film) => film.id === id) != -1 ? true : false;
    }




    getLikeFilm() {
        this.filmsLiked = this.localStorageService.getLocalStorageFilm();
    }

    likeFilm(id: number) {
      console.log("%c likeFilm => ", "color:yellow" , id);
        if (this.isFilmLiked(id)) {
            const indexFilm = this.filmsLiked.findIndex(
                (film) => {
                    if (film.id === id) {
                        return true;
                    }
                }
            );
            this.filmsLiked.splice(indexFilm, 1);
        } else {
            let film = this.films.find((film) => film.id === id);
            film.liked = true;
            this.filmsLiked.push(film)
        }
        this.saveFilmLiked();
        this.emitFilmSubject();
    }

    saveFilmLiked(){
        this.localStorageService.storeOnLocalStorageFilm(this.filmsLiked);
    }





}
