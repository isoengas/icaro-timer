import { Component, OnInit, Input } from '@angular/core';
import { TimerStep } from '../services/timer';

@Component({
  selector: 'app-round-display',
  templateUrl: './round-display.component.html',
  styleUrls: ['./round-display.component.css']
})
export class RoundDisplayComponent implements OnInit {
  @Input()
  public currentStep: TimerStep;
  constructor() { }

  ngOnInit() {
  }
  public get roundDisplay(): string {
    if (!this.currentStep) {
      return '(press start)';
    }
    if (this.currentStep.totalRounds === 0) {
      return 'no rounds';
    }
    return `Round ${this.currentStep.roundNumber} of ${this.currentStep.totalRounds}`;
  }
}
