import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { ResultComponent } from './result/result.component';
import { MovieInfoComponent } from './movie-info/movie-info.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CastComponent } from './movie-info/cast/cast.component';
import { RatingBarComponent } from './movie-info/rating-bar/rating-bar.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';


const appRoutes: Routes = [
  { path: '', component: SearchComponent },
  { path: 'movie/:id', component: MovieInfoComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ResultComponent,
    MovieInfoComponent,
    CastComponent,
    RatingBarComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
