import { PresentationConnection as PresentationConnectionInterface } from '../../interfaces/presentation-connection';
import { PresentationConnectionStateEvents } from '../../partial/presentation-connection-state-events';
import { MESSAGE_NAMESPACE } from './shared';

export class PresentationReceiverConnection extends PresentationConnectionStateEvents implements PresentationConnectionInterface {

    id: string;
    url = "URL_NOT_KNOWN";

    private _messageBus: cast.receiver.CastMessageBus;

    constructor(id: string, messageBus: cast.receiver.CastMessageBus) {
        super();

        this.receiveMessage = this.receiveMessage.bind(this);

        this.id = id;
        this._messageBus = messageBus;

        this._messageBus.addEventListener(cast.receiver.CastMessageBus.EventType.MESSAGE, this.receiveMessage);

        this.state = "connected";
    }

    receiveMessage(e: cast.receiver.CastMessageBus.Event) {
        console.log('msg', e);
        this.dispatchEvent({
            type: 'message',
            data: e.data
        })
    }


    close() {

    }

    terminate() {

    }

    send(msg: string) {
        this._messageBus.send(this.id, msg);
    }

    catchConnectError(err: Error) {
        this.state = "terminated";
        throw err;
    }

}