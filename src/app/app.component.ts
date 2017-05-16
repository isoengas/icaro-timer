import { Component } from '@angular/core';
import { Timer, ITimerSettings, IAmrapSettings } from './services/timer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  constructor(public timerService: Timer) {}

  startTimer(): void {
    const timerSettings: ITimerSettings = {
      timerDirection: 'Down',
      timeCap: {
        minutes: 1,
        seconds: 0
      }
    } ;
    this.timerService.startTimer(timerSettings);
  }

  startAmrap(): void {
    const amrapSettings: IAmrapSettings = {
      numRounds: 8,
      workTime: {
        minutes: 0,
        seconds: 20
      },
      restTime: {
        minutes: 0,
        seconds: 10
      }
    };
    this.timerService.startAMPRAP(amrapSettings);
  }
}
