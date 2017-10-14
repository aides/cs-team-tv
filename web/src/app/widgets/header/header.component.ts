import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'cs-datetime',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  datetime: Date;

  constructor() {
    this.datetime = new Date();
  }

  getDaysTillTheEndOfSprint() {
    const sprintStart = new Date(2017, 8, 6);
    const days = 14 - Math.floor((Date.now() - sprintStart.valueOf()) / 1000 / 60 / 60 / 24 % 14);

    let result = `in ${days} days`;

    if (days === 14) {
      result = 'today!';
    } else if (days === 1) {
      result = 'tomorrow';
    }

    return result;
  }

  ngOnInit() {
    Observable.interval(1000).startWith(0).subscribe(() => {
      this.datetime = new Date();
    });
  }
}
