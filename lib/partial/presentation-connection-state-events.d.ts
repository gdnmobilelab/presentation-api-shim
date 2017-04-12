/// <reference types="core-js" />
import { PresentationConnectionState } from '../enums/presentation-connection-state';
import EventTargetImplementation from 'eventtarget';
export declare class PresentationConnectionStateEvents extends EventTargetImplementation {
    private _state;
    onconnect: Function;
    onclose: Function;
    onmessage: Function;
    onterminate: Function;
    state: PresentationConnectionState;
}
