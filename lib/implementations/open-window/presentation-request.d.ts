/// <reference types="core-js" />
import EventTargetImplementation from 'eventtarget';
import { PresentationRequest as PresentationRequestInterface } from '../../interfaces/presentation-request';
import { PresentationConnection } from './presentation-connection';
import { PresentationAvailability } from './presentation-availability';
export declare class PresentationRequest extends EventTargetImplementation implements PresentationRequestInterface {
    private _targetURL;
    private _castWindow;
    onconnectionavailable: Function;
    constructor(urls: string | string[]);
    getAvailability(): Promise<PresentationAvailability>;
    start(): Promise<PresentationConnection>;
    reconnect(): Promise<PresentationConnection>;
}
