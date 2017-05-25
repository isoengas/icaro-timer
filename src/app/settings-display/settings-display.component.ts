import { Component, OnInit, Input } from '@angular/core';
import { Settings, TimerSettings, AmrapSettings } from '../services/timer';

@Component({
  selector: 'app-settings-display',
  templateUrl: './settings-display.component.html',
  styleUrls: ['./settings-display.component.css']
})
export class SettingsDisplayComponent implements OnInit {
  @Input()
  settings: Settings;
  roundsPluralization: {[k: string]: string} =
  {
    '=1': '1 ROUND',
    'other': '# ROUNDS'
  };
  constructor() { }

  ngOnInit() {
  }
  get isTimer(): boolean {
    return this.settings instanceof TimerSettings;
  }
  get hasRest(): boolean {
    return this.settings instanceof AmrapSettings && (this.settings.restTime.minutes > 0 || this.settings.restTime.seconds > 0);
  }
}
