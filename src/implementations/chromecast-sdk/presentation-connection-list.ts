import EventTargetImplementation from 'eventtarget';
import { PresentationConnectionList as PresentationConnectionListInterface } from '../../interfaces/presentation-connection-list';
import { PresentationConnectionState } from '../../enums/presentation-connection-state';

import { PresentationReceiverConnection } from './presentation-receiver-connection';

import { MESSAGE_NAMESPACE } from './shared';

export class PresentationConnectionList extends EventTargetImplementation implements PresentationConnectionListInterface {

    connections: PresentationReceiverConnection[];
    onconnectionavailable: Function;

    _instance: cast.receiver.CastReceiverManager;
    _messageBus: cast.receiver.CastMessageBus;

    constructor() {
        super();

        this.connections = [];

        this._instance = cast.receiver.CastReceiverManager.getInstance();
        this._messageBus = this._instance.getCastMessageBus(MESSAGE_NAMESPACE);

        this._instance.addEventListener(cast.receiver.CastReceiverManager.EventType.SENDER_CONNECTED, this.newSender.bind(this));


        this._instance.start();
    }

    newSender(e: cast.receiver.SenderConnectedEvent) {
        let newConnection = new PresentationReceiverConnection(e.senderId, this._messageBus);
        this.connections.push(newConnection);

        this.dispatchEvent({
            type: 'connectionavailable',
            connection: newConnection
        })
    }
}