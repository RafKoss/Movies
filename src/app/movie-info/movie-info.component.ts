import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MovieDataService } from '../services/movie-data.service';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.css']
})
export class MovieInfoComponent implements OnInit {
  @ViewChild('imageModal', {static: false}) imageModal: ElementRef;
  public stars = [];
  public movie;
  constructor(private movieDataService: MovieDataService) { }

  ngOnInit() {
    this.movie = this.movieDataService.getMovieData();
    this.movieDataService.setMovieData(null);
    this.setStarRating();
  }

  openImageModal() {
    this.imageModal.nativeElement.style.display = 'block';
  }

  closeImageModal() {
    this.imageModal.nativeElement.style.display = 'none';
  }

  setStarRating() {
    const value = this.movie.Ratings[0].Value.split('/');
    const realValue = value[0].split('.');
    for (let index = 0; index < +realValue[0]; index++) {
      this.stars.push('star');
    }
    if (realValue.length > 1) {
      if (+realValue[1] <= 2) {
        this.stars.push('star_border');
      } else if (+realValue[1] > 2 && +realValue[1] < 8) {
        this.stars.push('star_half');
      } else if (+realValue[1] >= 8) {
        this.stars.push('star');
      }
    }
    for (let index = this.stars.length; index < 10; index++) {
      this.stars.push('star_border');
    }
  }
}
