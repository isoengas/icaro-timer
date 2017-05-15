import { Component, OnInit, Input } from '@angular/core';
import { TimerStatus } from '../models/timer';

@Component({
  selector: 'app-status-display',
  templateUrl: './status-display.component.html',
  styleUrls: ['./status-display.component.css']
})
export class StatusDisplayComponent implements OnInit {
  @Input()
  public status: TimerStatus;
  constructor() { }

  ngOnInit() {
  }

}
