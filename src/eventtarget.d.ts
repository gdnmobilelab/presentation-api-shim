interface EventTarget {
    addEventListener(type: string, listener?: EventListenerOrEventListenerObject, useCapture?: boolean): void;
    dispatchEvent(evt: any): boolean;
    removeEventListener(type: string, listener?: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare module "eventtarget" {
    export default EventTarget;
}