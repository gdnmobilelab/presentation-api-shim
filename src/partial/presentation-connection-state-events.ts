import { PresentationConnectionState } from '../enums/presentation-connection-state';
import EventTargetImplementation from 'eventtarget';

export class PresentationConnectionStateEvents extends EventTargetImplementation {

    private _state: PresentationConnectionState;

    onconnect: Function;
    onclose: Function;
    onmessage: Function;
    onterminate: Function;

    get state(): PresentationConnectionState {
        return this._state;
    }

    set state(value: PresentationConnectionState) {

        if (value === this._state) {
            // don't fire events if this isn't a new change
            return
        }

        this._state = value;

        if (value === "connected") {
            this.dispatchEvent({
                type: 'connect'
            })
        } else if (value === "closed") {
            this.dispatchEvent({
                type: 'close'
            })
        } else if (value === "terminated") {
            this.dispatchEvent({
                type: 'terminate'
            })
        }

    }
}