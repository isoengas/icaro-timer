import { Component, OnInit, Input } from '@angular/core';
import { ITime } from '../services/timer';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.css']
})
export class StopwatchComponent implements OnInit {
  @Input()
  public timer: ITime;
  constructor() { }

  ngOnInit() {
  }

}
