import { h, render, Component, ComponentProps } from 'preact';
import {formatDate} from "./DateFormatter";

// JSX.HTMLAttributes include: id, class(Name), style, autoplay, etc.
export type ClockComponentProps = ClockComponentPropsInternal & JSX.HTMLAttributes;

// ComponentProps<T> include: key, children, ref.
export interface ClockComponentPropsInternal extends ComponentProps<ClockComponent> {
    updateFreq?: number;
    msPrecision?: number; // eg. 0|undefined for no ms display, or 3 for three digits of precision.
}

export interface ClockComponentState {
    date: Date;
}

/** Based on:
  * ReactJS tutorial: https://reactjs.org/docs/state-and-lifecycle.html
  * Preact-TS repo: https://github.com/kristoferbaxter/preact-hn/blob/b30048a11aa6f21b46c352b331d0e8d1b2875cac/src/components/WithData/index.tsx
  **/
export class ClockComponent extends Component<ClockComponentProps, ClockComponentState> {
    private timerID: number;
    /* https://reactjs.org/docs/components-and-props.html#props-are-read-only
     * Props isn't technically readonly, but should be treated as such (props should only entered in the JSX declaration). */
    // public readonly props: { date: Date }

    /* https://reactjs.org/docs/state-and-lifecycle.html#do-not-modify-state-directly
     * State isn't technically readonly, but should only ever be changed via setState() in order to propagate a call to render() if necessary. */
    // private readonly state: { date: Date }

    /* No constructor properties beyond the 'props' obj can be specified, as JSX format is XML-like, so there's only capacity to enter them as markup properties. */
    constructor(props: ClockComponentProps){
        super(props);
        this.state = {date: new Date()};
    }

    componentDidMount(): void {
        this.timerID = window.setInterval(
            () => this.tick(),
            this.props.updateFreq || 1000
        );
    }

    componentWillUnmount(): void {
        clearInterval(this.timerID);
    }

    tick(): void {
        /* Triggers render() if resultant state doesn't deep-equal previous state.
         * https://reactjs.org/docs/state-and-lifecycle.html#using-state-correctly
         * this.state may update out-of-sync with this.props, unless the setState((prevState, currentProps)=>{}) overload is used. */
        this.setState({
            date: new Date()
        });
    }

    /* Unlike React, the render method receives props and state as args: https://preactjs.com/guide/getting-started */
    render({ msPrecision, ...otherProps }: ClockComponentProps, state: ClockComponentState): JSX.Element {
        // If you pass no value to a prop (eg. showMs without an = after it), it defaults to true, matching HTML's behaviour.
        // https://reactjs.org/docs/jsx-in-depth.html#props-default-to-true
        return (
            // Alternatively, can return a <FormattedDate/> based on the commented-out code below.
            <span {...otherProps}>{formatDate(state.date, msPrecision)}</span>
        );
    }
}

/** How to make a <FormattedDate/> sub-component, based on the architecture of the ReactJS tutorial:
  * https://reactjs.org/docs/state-and-lifecycle.html 
  **/

// export interface FormattedDateProps {
//     msPrecision?: number;
//     date: Date;
// }

// function FormattedDate({ msPrecision, date, ...other }: FormattedDateProps): JSX.Element {
//     const utc: string = date.toUTCString();
//     const utcSplitOnComma: string[] = utc.split(',');
//     const utcMiddleSplitOnSpace: string[] = utcSplitOnComma[1].slice(1).split(' ');
//     const timerSplitOnColon: string[] = date.toLocaleTimeString().split(':');
//     const hourBasedOnZero: number = (parseInt(timerSplitOnColon[0]) % 12); // 12 is substituted for 0 in 12-hour time.
//     const ms: string = msPrecision ? `:${(date.getMilliseconds()/1000).toPrecision(msPrecision).slice("0.".length)}` : "";
//
//     // "Thu 09 Nov 12:38 AM";
//     // "Thu 09 Nov 12:38:957 AM"; // If showMs is specified.
//     const dateStr: string = `${utcSplitOnComma[0]} ${utcMiddleSplitOnSpace[0]} ${utcMiddleSplitOnSpace[1]} ${hourBasedOnZero === 0 ? 12 : hourBasedOnZero}:${timerSplitOnColon[1]}${ms} ${parseInt(timerSplitOnColon[0]) >= 12 ? "PM" : "AM"}`;
//
//     return <span {...other} >{dateStr}</span>;
// }