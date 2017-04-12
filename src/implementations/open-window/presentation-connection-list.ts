import EventTargetImplementation from 'eventtarget';
import { PresentationConnectionList as PresentationConnectionListInterface } from '../../interfaces/presentation-connection-list';
import { PresentationConnectionState } from '../../enums/presentation-connection-state';

import { PresentationConnection } from './presentation-connection';

export class PresentationConnectionList extends EventTargetImplementation implements PresentationConnectionListInterface {

    private _connections: PresentationConnection[];

    onconnectionavailable: Function;

    get connections() {
        return this._connections;
    }

    constructor() {
        super();

        this._connections = [];

        let opener = window.opener as Window;

        // Use a MessageChannel to get the data for this connection from the host.
        let channel = new MessageChannel();

        let listenerFunction = (e) => {

            if (!e.data || e.data.type !== 'confirmation') {
                return;
            }

            channel.port2.removeEventListener('message', listenerFunction);

            let connection = new PresentationConnection(e.data.urlForConnection, e.data.id);
            connection.state = "connected";
            connection.setMessagePort(channel.port2);

            this._connections.push(connection);

            this.dispatchEvent({
                type: 'connectionavailable',
                connection: connection
            });

        }
        channel.port2.start();
        channel.port2.addEventListener('message', listenerFunction);

        opener.postMessage({
            type: 'connect'
        }, "*", [channel.port1]);

    }

}