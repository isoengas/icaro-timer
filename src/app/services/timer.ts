import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ClockService } from './clock.service';
import { BeeperService } from './beeper.service';
import { FullscreenService } from './fullscreen.service';

export type TimerStatus = 'Idle' | 'Ready' | 'Work' | 'Rest' | 'Finished';
export type TimerDirection = 'Up' |'Down';

export class TimerStep {
    status: TimerStatus;
    direction: TimerDirection;
    time: ITime;
    roundNumber: number;
    totalRounds: number;
    playEndSound? = false;
}

@Injectable()
export class Timer {
    public running = false;
    // public timer;
    private steps: Array<TimerStep>;
    public currentStep: TimerStep;
    public currentTime: ITime = { minutes: 0, seconds: 0 };
    public currentStatus: TimerStatus = 'Idle';
    public currentTime$ = new Subject<ITime>();
    public currentStatus$ = new Subject<TimerStatus>();
    public currentStep$ = new Subject<TimerStep>();
    private withSound: boolean;
    private fullScreen: boolean;
    constructor(private clock: ClockService, private beeper: BeeperService, private fullscreenService: FullscreenService) {
        this.clock.tick.subscribe(() => this.pulse());
    }
    public start(clockSettings: ClockSettings, sound: boolean, fullScreen: boolean): void {
        this.withSound = sound;
        this.fullScreen = fullScreen;
        if (fullScreen) {
            this.fullscreenService.enterFullscreen();
        }
        if (this.isAmrap(clockSettings)) {
            this.startAMPRAP(clockSettings);
        } else {
            this.startTimer(clockSettings);
        }
    }
    private startAMPRAP(settings: AmrapSettings): void {
        this.running = true;
        this.currentStep = null;
        this.steps = this.getAmrapSteps(settings);
        this.initTimer();
    }

    private getAmrapSteps(settings: AmrapSettings): Array<TimerStep> {
        const result = new Array<TimerStep>();
        result.push(this.readyStep());
        for (let i = 1; i <= settings.numRounds; i++) {
            result.push({
                status: 'Work',
                direction: 'Down',
                time: settings.workTime,
                roundNumber: i,
                totalRounds: settings.numRounds
            });
            if ((settings.restTime.minutes > 0 || settings.restTime.seconds > 0) && i < settings.numRounds) {
                result.push({
                    status: 'Rest',
                    direction: 'Down',
                    time: settings.restTime,
                    roundNumber: i,
                    totalRounds: settings.numRounds
                });
            }
        }
        result[result.length - 1].playEndSound = this.withSound;
        return result;
    }

    private isAmrap(settings: AmrapSettings | TimerSettings): settings is AmrapSettings {
        return (<AmrapSettings>settings).numRounds !== undefined;
    }

    private startTimer(settings: TimerSettings): void {
        this.running = true;
        this.currentStep = null;
        this.steps = this.getTimerSteps(settings);
        this.initTimer();
    }

    public pause(): void {
        this.running = false;
        this.clock.stop();
    }

    public resume(): void {
        this.running = true;
        this.clock.start();
    }

    public stop(): void {
        this.currentStatus = 'Idle';
        this.currentStep = null;
        this.running = false;
        this.steps = [];
        this.currentTime = { minutes: 0, seconds: 0 };
        this.clock.stop();
        if (this.fullScreen) {
            this.fullscreenService.exitFullscreen();
        }
    }

    private getTimerSteps(settings: TimerSettings): Array<TimerStep> {
        const result = new Array<TimerStep>();
        result.push(this.readyStep());
        const workTime = settings.timeCap || { minutes: 99, seconds: 59 };
        result.push({
            status: 'Work',
            direction: settings.timerDirection,
            time: workTime,
            roundNumber: 1,
            totalRounds: 1,
            playEndSound: this.withSound
        });
        return result;
    }

    private initTimer(): void {
        // if (this.timer) {
        //     this.clearTimer();
        // }
        this.everySecond();
        this.clock.start();
        // this.timer = setInterval(() => this.everySecond(), 1000);
    }

    // private clearTimer(): void {
    //     clearInterval(this.timer);
    // }

    public pulse(): void {
        this.everySecond();
    }

    private everySecond(): void {
        if (!this.currentStep) {
            if (this.steps.length > 0) {
                this.setCurrentStep(this.steps.shift());
            } else if (this.currentStatus !== 'Finished') {
                this.currentStatus = 'Finished';
                this.running = false;
                this.currentStatus$.next(this.currentStatus);
                this.clock.stop();
                if (this.fullScreen) {
                    this.fullscreenService.exitFullscreen();
                }
            }
            return;
        }
        if (this.currentStep.direction === 'Up') {
            this.currentTime = this.incrementedOneSecond(this.currentTime);
            if (this.currentTime.minutes === this.currentStep.time.minutes && this.currentTime.seconds === this.currentStep.time.seconds) {
                if (this.currentStep.playEndSound) {
                    this.beeper.finishSound();
                }
                this.currentStep = null;
                this.everySecond();
            }
        } else {
            this.currentTime = this.decrementedOneSecond(this.currentTime);
            if (this.currentTime.minutes <= 0 && this.currentTime.seconds <= 0) {
                if (this.currentStep.playEndSound) {
                    this.beeper.finishSound();
                }
                this.currentStep = null;
                this.everySecond();
            }
        }
        this.currentTime$.next(this.currentTime);
    }

    private setCurrentStep(step: TimerStep): void {
        this.currentStep = step;

        if (step.direction === 'Down') {
            this.currentTime = step.time;
        } else {
            this.currentTime = { minutes: 0, seconds: 0 };
        }
        this.currentTime$.next(this.currentTime);
        this.currentStatus = step.status;
        this.currentStatus$.next(this.currentStatus);
    }

    private incrementedOneSecond(currentTime: ITime): ITime {
        const result: ITime = {
            seconds: currentTime.seconds + 1,
            minutes: currentTime.minutes
        };
        if (result.seconds === 60) {
            result.seconds = 0;
            result.minutes += 1;
        }
        return result;
    }

    private decrementedOneSecond(currentTime: ITime): ITime {
        if (currentTime.minutes === 0 && currentTime.seconds === 0) {
            return currentTime;
        }
        const result: ITime = {
            seconds: currentTime.seconds - 1,
            minutes: currentTime.minutes
        };
        if (result.seconds === -1) {
            result.seconds = 59;
            result.minutes -= 1;
        }
        return result;
    }

    private readyStep(): TimerStep {
        return {
            status: 'Ready',
            direction: 'Down',
            time: {
                seconds: 10,
                minutes: 0
            },
            roundNumber: 0,
            totalRounds: 0,
            playEndSound: this.withSound
        };
    }
}

export interface ITime {
    minutes: number;
    seconds: number;
}

export class AmrapSettings {
    numRounds: number;
    workTime: ITime;
    restTime: ITime;
}

export class TimerSettings {
    timeCap?: ITime;
    timerDirection: TimerDirection;
    constructor() {
        this.timerDirection = 'Up';
    }
}

export type ClockSettings = TimerSettings | AmrapSettings;
