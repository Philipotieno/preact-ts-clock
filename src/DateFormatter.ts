export function formatDate(date: Date, msPrecision?: number): string {
    const utc: string = date.toUTCString();
    const utcSplitOnComma: string[] = utc.split(',');
    const utcMiddleSplitOnSpace: string[] = utcSplitOnComma[1].slice(1).split(' ');
    const timerSplitOnColon: string[] = date.toLocaleTimeString().split(':');
    const hourBasedOnZero: number = (parseInt(timerSplitOnColon[0]) % 12); // 12 is substituted for 0 in 12-hour time.
    const s: string = new Date().getSeconds().toString();
    const ms: string = msPrecision ? `:${(date.getMilliseconds()/1000).toPrecision(msPrecision).slice("0.".length).slice(0, msPrecision)}` : "";

    // "Thu 09 Nov 12:38 AM";
    // "Thu 09 Nov 12:38:957 AM"; // If showMs is specified.
    return `${utcSplitOnComma[0]} ${utcMiddleSplitOnSpace[0]} ${utcMiddleSplitOnSpace[1]} ${hourBasedOnZero === 0 ? 12 : hourBasedOnZero}:${timerSplitOnColon[1]}:${s}${ms} ${parseInt(timerSplitOnColon[0]) >= 12 ? "PM" : "AM"}`;
}