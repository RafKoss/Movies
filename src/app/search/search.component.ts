import { Component, OnInit, ViewChild, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { SearchingService } from '../services/searching.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  public results = [];
  public newResults = [];
  private moviesPage = 1;
  public isLoading = false;
  private filterBarToggle = false;
  public errorMessage = false;
  public endOfMovies = false;
  private formData;
  public years: Array<number>;
  private update = true;
  private searchSubscription: Subscription;
  private scrollSubscription: Subscription;
  @ViewChild('filterBar', {static: false}) filterBar: ElementRef;

  constructor( public searchingService: SearchingService) { }

  ngOnInit() {
    this.years = this.initYears();
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

  onFilterClick() {
    if (!this.filterBarToggle) {
      this.filterBar.nativeElement.style.top = '0px';
      this.filterBar.nativeElement.style.visibility = 'visible';
      this.filterBar.nativeElement.style.boxShadow = '0px 0px 20px 4px rgba(0, 0, 0, 0.452)';
    } else {
      this.filterBar.nativeElement.style.top = '-60px';
      this.filterBar.nativeElement.style.visibility = 'hidden';
      this.filterBar.nativeElement.style.boxShadow = '0px 0px 0px 0px rgba(0, 0, 0, 0.452)';


    }
    this.filterBarToggle = !this.filterBarToggle;
  }

  onSearch(form: NgForm) {
    this.isLoading = true;
    this.errorMessage = false;
    this.results = [];
    this.newResults = [];
    this.moviesPage = 1;
    this.endOfMovies = false;
    this.update = true;
    this.formData = form;
    this.searchSubscription = this.searchingService.findMovies(form.value, 1, form.value.year, form.value.type)
    .subscribe(movies => {
      if (movies === 'Movie not found!') {
        this.errorMessage = true;
        this.isLoading = false;
      } else {
        this.results = movies;
        this.isLoading = false;
      }
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    const scrollPercent = window.pageYOffset / (document.body.scrollHeight - window.innerHeight) * 100;
    if (scrollPercent > 50 && this.update) {
      this.update = false;
      this.moviesPage++;

      this.scrollSubscription = this.searchingService.findMovies(this.formData.value, this.moviesPage, this.formData.value.year, this.formData.value.type)
      .subscribe(movies => {
        if (movies === 'Movie not found!') {
          this.endOfMovies = true;
        } else {
        this.newResults = movies;
        }
      });
    }
    if (scrollPercent > 95) {
      if (!this.endOfMovies) {
        this.update = true;
        this.updateResults();
        this.scrollSubscription.unsubscribe();
      }
    }
  }

  updateResults() {
    for (const movie of this.newResults) {
      this.results.push(movie);
    }
  }

  initYears() {
    const yearsArray = [];
    const currentYear = (new Date()).getFullYear();
    for (let index = currentYear; index > 1900; index--) {
      yearsArray.push(index);
    }
    return yearsArray;
  }

}
