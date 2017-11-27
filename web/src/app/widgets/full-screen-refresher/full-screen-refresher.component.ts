import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'cs-full-screen-refresher',
  templateUrl: './full-screen-refresher.component.html',
  styleUrls: ['./full-screen-refresher.component.css']
})
export class FullScreenRefresherComponent implements OnInit {

  private visible: Boolean;
  private backgroundColor: string;
  private textColor: string;
  private showInterval: number;
  private showTime: number;

  constructor() {
    this.visible = false;
    this.showInterval = 37 * 60 * 1000; // 37 minutes
    this.showTime = 1000;
  }

  ngOnInit() {
    Observable.interval(this.showInterval).flatMap(() => {
      this.visible = true;
      // tslint:disable-next-line:no-bitwise
      this.backgroundColor = '#' + Math.random().toString(16).substring(2, 8);
      this.textColor = '#' + Math.random().toString(16).substring(2, 8);

      return Observable.timer(this.showTime).map(() => {
        this.visible = false;
      });
    }).subscribe();
  }
}
