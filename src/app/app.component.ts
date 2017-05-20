import { Component } from '@angular/core';
import { Timer, AmrapSettings, TimerSettings } from './services/timer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isSettingsOpen = false;
  currentSettings: TimerSettings | AmrapSettings;
  constructor(public timerService: Timer) {
    this.currentSettings = new TimerSettings();
    this.currentSettings.timerDirection = 'Up';
  }

  // startTimer(): void {
  //   const timerSettings: ITimerSettings = {
  //     timerDirection: 'Down',
  //     timeCap: {
  //       minutes: 1,
  //       seconds: 0
  //     }
  //   } ;
  //   this.timerService.startTimer(timerSettings);
  // }

  // startAmrap(): void {
  //   const amrapSettings: IAmrapSettings = {
  //     numRounds: 8,
  //     workTime: {
  //       minutes: 0,
  //       seconds: 20
  //     },
  //     restTime: {
  //       minutes: 0,
  //       seconds: 10
  //     }
  //   };
  //   this.timerService.startAMPRAP(amrapSettings);
  // }
  start(): void {
    this.timerService.start(this.currentSettings);
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
    this.isSettingsOpen = true;
  }
}
