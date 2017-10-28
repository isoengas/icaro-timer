import { Component } from '@angular/core';
import { Timer, AmrapSettings, TimerSettings, ClockSettings } from './services/timer';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isSettingsOpen = false;
  currentClockSettings: ClockSettings;
  withSound: boolean;
  fullScreen: boolean;
  constructor(public timerService: Timer, private storageService: StorageService) {
    const clockSettings = new TimerSettings();
    clockSettings.timerDirection = 'Up';
    clockSettings.timeCap = null;
    this.currentClockSettings = storageService.read<ClockSettings>('settings') || clockSettings;
    this.withSound = storageService.read<boolean>('withSound') || false;
    this.fullScreen = storageService.read<boolean>('fullScreen') || false;
  }

  start(): void {
    this.timerService.start(this.currentClockSettings, this.withSound, this.fullScreen);
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
  settingsApplied(): void {
    this.storageService.write('settings', this.currentClockSettings);
    this.storageService.write('withSound', this.withSound);
    this.storageService.write('fullScreen', this.fullScreen);
    this.isSettingsOpen = false;
  }
}
