import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Settings, TimerSettings, AmrapSettings } from '../services/timer';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  @Input()
  settings: Settings;
  @Output()
  settingsChange = new EventEmitter<Settings>();
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
    if (this.settings instanceof TimerSettings) {
      this.timerSettings = this.settings;
    } else {
      this.amrapSettings = this.settings;
    }
  }

  get istimer(): boolean {
    return this.settings instanceof TimerSettings;
  }
  set istimer(value: boolean) {
    if (value) {
      this.settings = this.timerSettings;
    } else {
      this.settings = this.amrapSettings;
    }
    this.settingsChange.emit(this.settings);
  }

}
