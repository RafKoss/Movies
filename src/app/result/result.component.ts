import { Component, OnInit, Input } from '@angular/core';
import { MovieDataService } from '../services/movie-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  constructor(private movieDataService: MovieDataService,
              private router: Router) { }

  @Input() movie;

  ngOnInit() {
    if (this.movie.Poster === 'N/A') {
      this.movie.Poster = 'assets/noPoster.jpg';
    }
  }

  onClick() {
    this.movieDataService.setMovieData(this.movie);
    this.router.navigate(['/movie', this.movie.imdbID]);
  }

}
