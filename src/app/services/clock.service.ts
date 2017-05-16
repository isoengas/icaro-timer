import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ClockService {
  public tick = new EventEmitter<object>();
  private clock;
  constructor() { }
  public start(): void {
    if (this.clock) {
      this.stop();
    }
    this.clock = setInterval(() => this.emitTick(), 1000);
  }
  public stop(): void {
    clearInterval(this.clock);
  }

  private emitTick(): void {
    this.tick.next(null);
  }
}

export class FakeClockService extends ClockService {
  public start(): void {}
  public stop(): void {}
}