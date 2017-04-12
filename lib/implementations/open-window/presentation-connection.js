"use strict";
const presentation_connection_state_events_1 = require('../../partial/presentation-connection-state-events');
class PresentationConnection extends presentation_connection_state_events_1.PresentationConnectionStateEvents {
    constructor(url, id) {
        super();
        this.receiveMessage = this.receiveMessage.bind(this);
        this.id = id;
        this.url = url;
    }
    setMessagePort(port) {
        this._messagePort = port;
        port.addEventListener('message', this.receiveMessage);
    }
    receiveMessage(e) {
        if (e.data.type === 'message') {
            this.dispatchEvent({
                type: 'message',
                data: e.data.message
            });
        }
        else if (e.data.type === 'close' || e.data.type === 'terminate') {
            this._messagePort.close();
            this.dispatchEvent({
                type: e.data.type
            });
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
    send(msg) {
        this._messagePort.postMessage({
            type: 'message',
            message: msg
        });
    }
}
exports.PresentationConnection = PresentationConnection;
