import {formatDate} from "./DateFormatter";

export class ClockHTML5 {
    private started: boolean = false;
    private timerID: number;

    constructor(public span: HTMLSpanElement){
        // Nothing to do in here.
    }

    startTicking(updateFreq: number, msPrecision?: number): void {
        this.tick(msPrecision); // Immediate tick.
        if(this.started) return;
        this.timerID = window.setInterval(this.tick.bind(this, msPrecision), updateFreq);
    }

    stopTicking(): void {
        window.clearInterval(this.timerID);
        this.started = false;
    }

    cleanUp(): void {
        this.stopTicking();
    }

    tick(msPrecision?: number): void {
        this.span.textContent = formatDate(new Date(), msPrecision);
    }
}