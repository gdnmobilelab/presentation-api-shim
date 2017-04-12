import { PresentationConnection as PresentationConnectionInterface } from '../../interfaces/presentation-connection';
import { PresentationConnectionStateEvents } from '../../partial/presentation-connection-state-events';
export declare class PresentationConnection extends PresentationConnectionStateEvents implements PresentationConnectionInterface {
    id: string;
    url: string;
    private _messagePort;
    private _window;
    constructor(url: string, id: string);
    setMessagePort(port: MessagePort): void;
    private receiveMessage(e);
    close(): void;
    terminate(): void;
    send(msg: string): void;
}
