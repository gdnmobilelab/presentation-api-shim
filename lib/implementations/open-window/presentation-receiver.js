"use strict";
const presentation_connection_list_1 = require('./presentation-connection-list');
class PresentationReceiver {
    constructor() {
        if (window.opener) {
            this.connectionList = Promise.resolve(new presentation_connection_list_1.PresentationConnectionList());
        }
        else {
            this.connectionList = Promise.reject(new Error("Not a manually opened window"));
        }
    }
}
exports.PresentationReceiver = PresentationReceiver;
