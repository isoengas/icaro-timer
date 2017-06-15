import { Injectable } from '@angular/core';

@Injectable()
export class BeeperService {
  audioCtx: AudioContext = new ((<any>window).AudioContext || (<any>window).webkitAudioContext)();
  constructor() { }
  public startSound(): void {
    const audio = new Audio('assets/whistle.mp3');
    audio.play();
  }
  public finishSound(): void {
    const audio = new Audio('assets/horn.mp3');
    audio.play();
  }
}
