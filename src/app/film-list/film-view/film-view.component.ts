import { Component, OnInit, Input } from '@angular/core';
import { Film } from 'src/app/models/film.model';
import { FilmService } from 'src/app/services/film-api.service';

@Component({
  selector: 'app-film-view',
  templateUrl: './film-view.component.html',
  styleUrls: ['./film-view.component.css']
})
export class FilmViewComponent implements OnInit {
  @Input() film: Film;
  
  limiteTexte: number = 250;
  urlHeartLike: string = "https://firebasestorage.googleapis.com/v0/b/book-project-b8ab1.appspot.com/o/images%2Fheart%2Funlike.png?alt=media&token=cb6a8e13-d162-4a03-a3cc-3eb967fca532";
  urlHeartUnlike: string = "https://firebasestorage.googleapis.com/v0/b/book-project-b8ab1.appspot.com/o/images%2Fheart%2Flike.png?alt=media&token=038d6c8e-76f1-47c1-8dba-4571101b3452";

  constructor(private FilmService: FilmService) { }

  ngOnInit(): void {
  }

  getImage(name){
    return 'https://image.tmdb.org/t/p/w300' + name
  }

  onReadMore(){
    this.limiteTexte = this.film.overview.length;
  }

  onReadLess(){
      this.limiteTexte = 250;
  }

  isLiked(isLiked: boolean){
    return isLiked ? this.urlHeartLike : this.urlHeartUnlike;
  }

  onLikePressed(id: number){
    this.FilmService.likeFilm(id);
  }

}
