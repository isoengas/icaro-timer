import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TimerStatus } from '../services/timer';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Input()
  isRunning: boolean;
  @Input()
  status: TimerStatus;
  @Output()
  start = new EventEmitter();
  @Output()
  stop = new EventEmitter()
  @Output()
  pause = new EventEmitter();
  @Output()
  resume = new EventEmitter();
  @Output()
  clear = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  public get canStart(): boolean {
    return this.status === 'Idle' || this.status === 'Finished';
  }

  public get canStop(): boolean {
    return this.status === 'Ready' || this.status === 'Work' ||this.status === 'Rest';
  }

  public get canPause(): boolean {
    return this.canStop && this.isRunning;
  }

  public get canResume() : boolean {
    return this.canStop && !this.isRunning;
  }

  public get canClear(): boolean {
    return this.status === 'Finished';
  }

}
