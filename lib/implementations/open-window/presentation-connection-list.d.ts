/// <reference types="core-js" />
import EventTargetImplementation from 'eventtarget';
import { PresentationConnectionList as PresentationConnectionListInterface } from '../../interfaces/presentation-connection-list';
import { PresentationConnection } from './presentation-connection';
export declare class PresentationConnectionList extends EventTargetImplementation implements PresentationConnectionListInterface {
    private _connections;
    onconnectionavailable: Function;
    readonly connections: PresentationConnection[];
    constructor();
}
