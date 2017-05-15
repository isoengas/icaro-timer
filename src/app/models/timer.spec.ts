import { Timer, ITimerSettings } from './timer';

describe('Timer tests', () => {
    let timer: Timer;
    const timerUpSettings: ITimerSettings = {
        timerDirection: 'Up',
        timeCap: {
            seconds: 5,
            minutes: 0
        }
    };
    beforeEach(() => {
        timer = new Timer();
    });

    it('should not be running when created', () => {
        expect(timer.running).toBe(false);
    });
    it('should have time to 0 when started', () => {
        expect(timer.currentTime.seconds).toBe(0);
        expect(timer.currentTime.minutes).toBe(0);
    });
    it('should have status to Idle when started', () => {
        expect(timer.currentStatus).toBe('Idle');
    });
    it('should start timer with Ready state', () => {
        timer.startTimer(timerUpSettings);
        expect(timer.currentStatus).toBe('Ready');
        expect(timer.running).toBe(true);
        expect(timer.currentTime.seconds).toBe(10);
        expect(timer.currentTime.minutes).toBe(0);
        expect(timer.currentStep.direction).toBe('Down');
    });
    it('should count down to 0 on Ready state', () => {
        timer.startTimer(timerUpSettings);
        for (let i = 1; i <= 10; i++) {
            timer.pulse();
            expect(timer.currentTime.seconds).toBe(10 - i);
            expect(timer.currentTime.minutes).toBe(0);
        }
        expect(timer.currentStatus).toBe('Ready');
    });
    it('should start counting after ready state', () => {
        timer.startTimer(timerUpSettings);
        for (let i = 1; i <= 10; i++) {
            timer.pulse();
        }
        timer.pulse();
        expect(timer.currentStatus).toBe('Work');
        expect(timer.currentTime.seconds).toBe(0);
        expect(timer.currentTime.minutes).toBe(0);
        // work timer
        for (let i = 1; i <= 5; i++) {
            timer.pulse();
            expect(timer.currentTime.minutes).toBe(0);
            expect(timer.currentTime.seconds).toBe(i);
        }
        expect(timer.currentStatus).toBe('Work');
    });
    it('should finish when reaching final time', () => {
        timer.startTimer(timerUpSettings);
        // Ready countdown
        for (let i = 1; i <= 10; i++) {
            timer.pulse();
        }
        // Work
        timer.pulse();
        for (let i = 1; i <= timerUpSettings.timeCap.seconds; i++) {
            timer.pulse();
        }
        timer.pulse();
        expect(timer.currentStatus).toBe('Finished');
        expect(timer.running).toBe(false);
    });
});
