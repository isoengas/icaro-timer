import { Component } from '@angular/core';
import { Timer } from './models/timer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  constructor(public timerService: Timer) {}
}
