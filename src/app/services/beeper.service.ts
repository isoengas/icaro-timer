import { Injectable } from '@angular/core';

@Injectable()
export class BeeperService {
  audioCtx: AudioContext = new ((<any>window).AudioContext || (<any>window).webkitAudioContext)();
  constructor() { }
  public shortBeep(): void {
    this.beep(100, 880, 1);
  }
  public longBeep(): void {
    this.beep(400, 880, 1);
  }
  private beep(duration: number, frequency: number, volume: number) {
    const oscillator: OscillatorNode = this.audioCtx.createOscillator();
    const gainNode: GainNode = this.audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioCtx.destination);

    if (volume) {
      gainNode.gain.value = volume;
    }
    if (frequency) {
      oscillator.frequency.value = frequency;
    }

    oscillator.start();
    setTimeout(() => oscillator.stop(), (duration ? duration : 500));
};
}
