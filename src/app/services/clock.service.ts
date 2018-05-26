import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ClockService {
  public tick = new EventEmitter<object>();
  private expected: number;
  private timeout: any;
  public start(): void {
    this.expected = Date.now() + 1000;
    this.timeout = setTimeout(() => this.step(), 1000);
  }
  public stop(): void {
    clearTimeout(this.timeout);
  }

  private step(): void {
    const drift = Date.now() - this.expected;
    this.emitTick();
    this.expected += 1000;
    this.timeout = setTimeout(() => this.step(), Math.max(0, 1000 - drift));
  }

  private emitTick(): void {
    this.tick.next(null);
  }
}

export class FakeClockService extends ClockService {
  public start(): void {}
  public stop(): void {}
}