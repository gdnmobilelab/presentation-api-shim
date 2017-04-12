import { PresentationConnectionState } from '../enums/presentation-connection-state';

export interface PresentationConnection extends EventTarget {
    id: string;
    url: string;
    state: PresentationConnectionState;
    close();
    terminate();
    onconnect: Function;
    onclose: Function;
    onterminate: Function;
    onmessage: Function;
    send(msg: string);
}