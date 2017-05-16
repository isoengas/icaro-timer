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

}
