import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchingService {

  constructor(private http: HttpClient) { }

  findMovies(movieData, page, year, type) {
    return this.http.get(
      'http://www.omdbapi.com/?s=' + movieData.title +
      '&page=' + page +
      '&y=' + year +
      '&type=' + type +
      '&r=json&apikey=5ab5d171')
    .pipe(map(moviesArray => {
      if ((moviesArray as any).Response === 'False') {
        return (moviesArray as any).Error;
      }
      const moviesInfo = [];
      const movieLoop = async() => {
        for (const movie of (moviesArray as any).Search) {
          const info = await this.getMovieInfo(movie);
          moviesInfo.push(info);
        }
      };
      movieLoop();
      return moviesInfo;
    }));
  }

  async getMovieInfo(movieObject) {
    let result;
    await this.http.get('http://www.omdbapi.com/?i=' + movieObject.imdbID + '&r=json&apikey=5ab5d171').toPromise()
    .then(movieInfo => {
      result  = movieInfo;
    });
    return result;
  }
}
