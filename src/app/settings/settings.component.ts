import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ClockSettings, TimerSettings, AmrapSettings } from '../services/timer';

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
  @Output()
  clockSettingsChange = new EventEmitter<ClockSettings>();
  @Output()
  withSoundChange = new EventEmitter<boolean>();
  @Output()
  onclose = new EventEmitter();

  timerSettings: TimerSettings;
  amrapSettings: AmrapSettings;

  constructor() {
    this.timerSettings = new TimerSettings();
    this.timerSettings.timerDirection = 'Up';
    this.amrapSettings = new AmrapSettings();
    this.amrapSettings.numRounds = 4;
    this.amrapSettings.workTime = { minutes: 0, seconds: 20 };
    this.amrapSettings.restTime = { minutes: 0, seconds: 10 };
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
}
