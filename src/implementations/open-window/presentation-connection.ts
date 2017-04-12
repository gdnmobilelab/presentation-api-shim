import { PresentationConnection as PresentationConnectionInterface } from '../../interfaces/presentation-connection';
import { PresentationConnectionStateEvents } from '../../partial/presentation-connection-state-events';

export class PresentationConnection extends PresentationConnectionStateEvents implements PresentationConnectionInterface {

    id: string;
    url: string;

    private _messagePort: MessagePort;

    private _window: Window;

    constructor(url: string, id: string) {
        super();

        this.receiveMessage = this.receiveMessage.bind(this);

        this.id = id;
        this.url = url;

    }

    setMessagePort(port: MessagePort) {
        this._messagePort = port;
        port.addEventListener('message', this.receiveMessage);
    }

    private receiveMessage(e: MessageEvent) {

        if (e.data.type === 'message') {
            this.dispatchEvent({
                type: 'message',
                data: e.data.message
            });
        } else if (e.data.type === 'close' || e.data.type === 'terminate') {
            this._messagePort.close();
            this.dispatchEvent({
                type: e.data.type
            })
        }
    }

    close() {
        this._messagePort.postMessage({
            type: 'close'
        });
        this._messagePort.close();
        this.dispatchEvent({
            type: 'close'
        });
    }

    terminate() {
        this._messagePort.postMessage({
            type: 'terminate'
        });
        this._messagePort.close();
        this.dispatchEvent({
            type: 'terminate'
        });
    }

    send(msg: string) {
        this._messagePort.postMessage({
            type: 'message',
            message: msg
        });
    }


}