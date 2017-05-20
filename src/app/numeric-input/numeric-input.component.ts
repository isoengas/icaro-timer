import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-numeric-input',
  templateUrl: './numeric-input.component.html',
  styleUrls: ['./numeric-input.component.css']
})
export class NumericInputComponent implements OnInit {
  @Input()
  number: number;
  @Input()
  incrementBy = 1;
  @Input()
  minNumber = 0;
  @Input()
  maxNumber = 99;
  @Output()
  numberChange = new EventEmitter<number>();
  @Input()
  suffix = "";
  constructor() { }

  ngOnInit() {
  }

  increment(): void {
    this.number += this.incrementBy;
    if (this.number > this.maxNumber) {
      this.number = this.minNumber;
    }
    this.numberChange.emit(this.number);
  }

  decrement(): void {
    this.number -= this.incrementBy;
    if (this.number < this.minNumber) {
      this.number = this.maxNumber;
    }
    this.numberChange.emit(this.number);
  }

}
