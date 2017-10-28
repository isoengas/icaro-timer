import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ClockSettings, TimerSettings, AmrapSettings, ITime, TimerDirection } from '../services/timer';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  @Input()
  clockSettings: ClockSettings;
  @Input()
  withSound: boolean;
  @Input()
  fullScreen: boolean;
  @Output()
  clockSettingsChange = new EventEmitter<ClockSettings>();
  @Output()
  withSoundChange = new EventEmitter<boolean>();
  @Output()
  fullScreenChange = new EventEmitter<boolean>();
  @Output()
  onclose = new EventEmitter();

  timerSettings: TimerSettings;
  amrapSettings: AmrapSettings;
  oldTimeCap: ITime;
  oldDirection: TimerDirection;

  constructor() {
    this.timerSettings = new TimerSettings();
    this.amrapSettings = new AmrapSettings();
    this.amrapSettings.numRounds = 1;
    this.amrapSettings.workTime = { minutes: 0, seconds: 0 };
    this.amrapSettings.restTime = { minutes: 0, seconds: 0 };
  }

  ngOnInit() {
    if (this.isAmrap(this.clockSettings)) {
      this.amrapSettings = this.clockSettings;
    } else {
      this.timerSettings = this.clockSettings;
    }
  }

  get istimer(): boolean {
    return !this.isAmrap(this.clockSettings);
  }
  set istimer(value: boolean) {
    if (value) {
      this.clockSettings = this.timerSettings;
    } else {
      this.clockSettings = this.amrapSettings;
    }
    this.clockSettingsChange.emit(this.clockSettings);
  }

  isAmrap(settings: ClockSettings): settings is AmrapSettings {
    return settings && (<AmrapSettings>settings).numRounds !== undefined;
  }

  toggleWithSound(): void {
    this.withSound = !this.withSound;
    this.withSoundChange.emit(this.withSound);
  }

  toggleFullScreen(): void {
    this.fullScreen = !this.fullScreen;
    this.fullScreenChange.emit(this.fullScreen);
  }

  toggleDirection(): void {
    if (this.timerSettings.timerDirection ==='Up') {
      this.timerSettings.timerDirection = 'Down';
    } else {
      this.timerSettings.timerDirection = 'Up';
    }
  }

  toggleTimeCap(): void {
    if (this.timerSettings.timeCap) {
      this.oldTimeCap = this.timerSettings.timeCap;
      this.oldDirection = this.timerSettings.timerDirection;
      this.timerSettings.timeCap = null;
      this.timerSettings.timerDirection = 'Up';
    } else {
      this.timerSettings.timeCap = this.oldTimeCap || { minutes: 10, seconds: 0 };
      this.timerSettings.timerDirection = this.oldDirection || 'Up';
    }
  }
}
