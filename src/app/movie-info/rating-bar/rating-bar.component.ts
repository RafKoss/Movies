import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-rating-bar',
  templateUrl: './rating-bar.component.html',
  styleUrls: ['./rating-bar.component.css']
})
export class RatingBarComponent implements OnInit, AfterViewInit {
  @Input() rating;
  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.setProgressBar();
  }

  setProgressBar() {
    const bar = document.getElementById(this.rating.Source);
    const value = this.rating.Value.split(/%|\//);
    bar.style.width = 2 * +value[0] + 'px';
  }
}
