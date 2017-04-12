import { PresentationConnection as PresentationConnectionInterface } from '../../interfaces/presentation-connection';
import { PresentationConnectionStateEvents } from '../../partial/presentation-connection-state-events';
export declare class PresentationControllerConnection extends PresentationConnectionStateEvents implements PresentationConnectionInterface {
    id: string;
    url: string;
    private _instance;
    private _session;
    constructor(id: string, url: string);
    private tidyup();
    close(): void;
    terminate(): void;
    send(msg: string): void;
    private sessionChange(e);
    private receiveMessage(namespace, message);
    catchConnectError(err: Error): void;
}
