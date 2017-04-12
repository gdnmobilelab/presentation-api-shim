import * as EventTargetImplementation from 'eventtarget';
import { PresentationConnectionState } from '../enums/presentation-connection-state';
export declare class PresentationConnectionEvents extends EventTargetImplementation {
    onconnect: Function;
    onclose: Function;
    onterminate: Function;
    onmessage: Function;
    private _state;
    constructor();
    state: PresentationConnectionState;
}
