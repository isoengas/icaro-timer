import { Component } from '@angular/core';
import { Timer, ITimerSettings, IAmrapSettings } from './services/timer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isSetup = false;
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

  stop(): void {
    this.timerService.stop();
  }

  pause(): void {
    this.timerService.pause();
  }
  resume(): void {
    this.timerService.resume();
  }
  setup(): void {
    this.isSetup = true;
  }
}
