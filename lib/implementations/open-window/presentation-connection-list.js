"use strict";
const eventtarget_1 = require('eventtarget');
const presentation_connection_1 = require('./presentation-connection');
class PresentationConnectionList extends eventtarget_1.default {
    constructor() {
        super();
        this._connections = [];
        let opener = window.opener;
        // Use a MessageChannel to get the data for this connection from the host.
        let channel = new MessageChannel();
        let listenerFunction = (e) => {
            if (!e.data || e.data.type !== 'confirmation') {
                return;
            }
            channel.port2.removeEventListener('message', listenerFunction);
            let connection = new presentation_connection_1.PresentationConnection(e.data.urlForConnection, e.data.id);
            connection.state = "connected";
            connection.setMessagePort(channel.port2);
            this._connections.push(connection);
            this.dispatchEvent({
                type: 'connectionavailable',
                connection: connection
            });
        };
        channel.port2.start();
        channel.port2.addEventListener('message', listenerFunction);
        opener.postMessage({
            type: 'connect'
        }, "*", [channel.port1]);
    }
    get connections() {
        return this._connections;
    }
}
exports.PresentationConnectionList = PresentationConnectionList;
