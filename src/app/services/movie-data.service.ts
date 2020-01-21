import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieDataService {
  private movieData;

  constructor() { }

  setMovieData(data) {
    this.movieData = data;
  }

  getMovieData() {
    return this.movieData;
  }
}
