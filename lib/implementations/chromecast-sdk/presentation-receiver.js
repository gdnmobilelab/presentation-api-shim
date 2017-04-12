"use strict";
const presentation_connection_list_1 = require('./presentation-connection-list');
const receiver_api_1 = require('./receiver-api');
class PresentationReceiver {
    constructor() {
        this.connectionList = receiver_api_1.getReceiverAPI()
            .then(() => {
            return new presentation_connection_list_1.PresentationConnectionList();
        });
    }
}
exports.PresentationReceiver = PresentationReceiver;
