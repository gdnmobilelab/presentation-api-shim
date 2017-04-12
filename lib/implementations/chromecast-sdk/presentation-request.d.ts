/// <reference types="core-js" />
import EventTargetImplementation from 'eventtarget';
import { PresentationRequest as PresentationRequestInterface } from '../../interfaces/presentation-request';
import { PresentationControllerConnection } from './presentation-controller-connection';
import { PresentationAvailability } from './presentation-availability';
export declare class PresentationRequest extends EventTargetImplementation implements PresentationRequestInterface {
    private _targetAppID;
    private _targetURL;
    onconnectionavailable: Function;
    constructor(urls: string | string[]);
    getAvailability(): Promise<PresentationAvailability>;
    start(): Promise<PresentationControllerConnection>;
    reconnect(): Promise<PresentationControllerConnection>;
}
