import { PresentationConnection as PresentationConnectionInterface } from '../../interfaces/presentation-connection';
import { PresentationConnectionStateEvents } from '../../partial/presentation-connection-state-events';
export declare class PresentationReceiverConnection extends PresentationConnectionStateEvents implements PresentationConnectionInterface {
    id: string;
    url: string;
    private _messageBus;
    constructor(id: string, messageBus: cast.receiver.CastMessageBus);
    receiveMessage(e: cast.receiver.CastMessageBus.Event): void;
    close(): void;
    terminate(): void;
    send(msg: string): void;
    catchConnectError(err: Error): void;
}
