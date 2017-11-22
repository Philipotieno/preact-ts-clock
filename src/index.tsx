import { ClockComponent } from "./ClockPreact";
import { ClockHTML5 } from "./ClockRegular";
import { h, render, Component } from 'preact';

/** Called automatically upon document.body.onload() */
function initApp(): void {
    const regularClockContainer: HTMLDivElement = document.querySelector('#regular-clock-container') as HTMLDivElement;
    const span: HTMLSpanElement = document.createElement('span');
    span.id = "regular-clock";
    span.style.color = "white";
    span.className = "round_bordered_backdrop_small";

    const regularClock: ClockHTML5 = new ClockHTML5(span);
    regularClock.startTicking(25, 2);
    regularClockContainer.appendChild(regularClock.span);

    const preactClockContainer: HTMLDivElement = document.querySelector('#preact-clock-container') as HTMLDivElement;

    const preactClock: JSX.Element = <ClockComponent id={"preact-clock"} style={{color:"white"}} msPrecision={2} updateFreq={25} class={"round_bordered_backdrop_small"} />;
    render(preactClock, preactClockContainer);
}

// Attach initApp from the webpack bundle to the window at the moment that the index.js module in the bundle is parsed by the browser.
(window as any).initApp = initApp;