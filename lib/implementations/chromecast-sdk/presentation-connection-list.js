"use strict";
const eventtarget_1 = require('eventtarget');
const presentation_receiver_connection_1 = require('./presentation-receiver-connection');
const shared_1 = require('./shared');
class PresentationConnectionList extends eventtarget_1.default {
    constructor() {
        super();
        this.connections = [];
        this._instance = cast.receiver.CastReceiverManager.getInstance();
        this._messageBus = this._instance.getCastMessageBus(shared_1.MESSAGE_NAMESPACE);
        this._instance.addEventListener(cast.receiver.CastReceiverManager.EventType.SENDER_CONNECTED, this.newSender.bind(this));
        this._instance.start();
    }
    newSender(e) {
        let newConnection = new presentation_receiver_connection_1.PresentationReceiverConnection(e.senderId, this._messageBus);
        this.connections.push(newConnection);
        this.dispatchEvent({
            type: 'connectionavailable',
            connection: newConnection
        });
    }
}
exports.PresentationConnectionList = PresentationConnectionList;
