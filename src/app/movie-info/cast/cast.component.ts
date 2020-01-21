import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'app-cast',
  templateUrl: './cast.component.html',
  styleUrls: ['./cast.component.css', '../movie-info.component.css']
})
export class CastComponent implements OnInit {
  @ViewChild('cast', {static: false}) cast: ElementRef;
  @Input() actors;
  constructor() { }

  ngOnInit() {
  }

  scrollRight() {
    this.cast.nativeElement.scrollLeft += 140;
  }

  scrollLeft() {
    this.cast.nativeElement.scrollLeft -= 140;
  }
}
