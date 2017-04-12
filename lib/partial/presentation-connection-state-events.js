"use strict";
const eventtarget_1 = require('eventtarget');
class PresentationConnectionStateEvents extends eventtarget_1.default {
    get state() {
        return this._state;
    }
    set state(value) {
        if (value === this._state) {
            // don't fire events if this isn't a new change
            return;
        }
        this._state = value;
        if (value === "connected") {
            this.dispatchEvent({
                type: 'connect'
            });
        }
        else if (value === "closed") {
            this.dispatchEvent({
                type: 'close'
            });
        }
        else if (value === "terminated") {
            this.dispatchEvent({
                type: 'terminate'
            });
        }
    }
}
exports.PresentationConnectionStateEvents = PresentationConnectionStateEvents;
