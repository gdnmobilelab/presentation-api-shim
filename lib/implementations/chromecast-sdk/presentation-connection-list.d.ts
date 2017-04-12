/// <reference types="core-js" />
import EventTargetImplementation from 'eventtarget';
import { PresentationConnectionList as PresentationConnectionListInterface } from '../../interfaces/presentation-connection-list';
import { PresentationReceiverConnection } from './presentation-receiver-connection';
export declare class PresentationConnectionList extends EventTargetImplementation implements PresentationConnectionListInterface {
    connections: PresentationReceiverConnection[];
    onconnectionavailable: Function;
    _instance: cast.receiver.CastReceiverManager;
    _messageBus: cast.receiver.CastMessageBus;
    constructor();
    newSender(e: cast.receiver.SenderConnectedEvent): void;
}
