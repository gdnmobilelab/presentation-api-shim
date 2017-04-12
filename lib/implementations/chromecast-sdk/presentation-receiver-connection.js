"use strict";
const presentation_connection_state_events_1 = require('../../partial/presentation-connection-state-events');
class PresentationReceiverConnection extends presentation_connection_state_events_1.PresentationConnectionStateEvents {
    constructor(id, messageBus) {
        super();
        this.url = "URL_NOT_KNOWN";
        this.receiveMessage = this.receiveMessage.bind(this);
        this.id = id;
        this._messageBus = messageBus;
        this._messageBus.addEventListener(cast.receiver.CastMessageBus.EventType.MESSAGE, this.receiveMessage);
        this.state = "connected";
    }
    receiveMessage(e) {
        console.log('msg', e);
        this.dispatchEvent({
            type: 'message',
            data: e.data
        });
    }
    close() {
    }
    terminate() {
    }
    send(msg) {
        this._messageBus.send(this.id, msg);
    }
    catchConnectError(err) {
        this.state = "terminated";
        throw err;
    }
}
exports.PresentationReceiverConnection = PresentationReceiverConnection;
