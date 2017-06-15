import { Component, OnInit, Input } from '@angular/core';
import { ClockSettings, TimerSettings, AmrapSettings } from '../services/timer';

@Component({
  selector: 'app-settings-display',
  templateUrl: './settings-display.component.html',
  styleUrls: ['./settings-display.component.css']
})
export class SettingsDisplayComponent implements OnInit {
  @Input()
  clockSettings: ClockSettings;
  roundsPluralization: {[k: string]: string} =
  {
    '=1': '1 ROUND',
    'other': '# ROUNDS'
  };
  constructor() { }

  ngOnInit() {
  }
  get isTimer(): boolean {
    return !this.isAmrap(this.clockSettings);
  }
  get hasRest(): boolean {
    return this.isAmrap(this.clockSettings) && (this.clockSettings.restTime.minutes > 0 || this.clockSettings.restTime.seconds > 0);
  }
  isAmrap(settings: TimerSettings | AmrapSettings): settings is AmrapSettings {
    return settings && (<AmrapSettings>settings).numRounds !== undefined;
  }
}
