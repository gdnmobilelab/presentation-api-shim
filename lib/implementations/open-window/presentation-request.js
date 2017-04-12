"use strict";
const eventtarget_1 = require('eventtarget');
const presentation_connection_1 = require('./presentation-connection');
const presentation_availability_1 = require('./presentation-availability');
const create_guid_1 = require('../../util/create-guid');
class PresentationRequest extends eventtarget_1.default {
    constructor(urls) {
        super();
        let urlArray = urls instanceof Array ? urls : [urls];
        let notCastURL = urlArray.find((u) => u.indexOf('//google.com/cast/#') === -1);
        if (!notCastURL) {
            throw new Error("Must provide a non-Cast URL to constructor");
        }
        this._targetURL = notCastURL;
    }
    getAvailability() {
        return Promise.resolve(new presentation_availability_1.PresentationAvailability());
    }
    start() {
        this._castWindow = window.open(this._targetURL, "cast-target", "left=0,top=0,width=600,height=400,location=yes,status=yes,scrollbars=no");
        let newConnection = new presentation_connection_1.PresentationConnection(this._targetURL, create_guid_1.default());
        newConnection.state = "connecting";
        // We now have to wait for our opened window to load, and post a message back to
        // us.
        let listener = (e) => {
            if (e.source !== this._castWindow) {
                // ensure it is actually a message from our target window
                return;
            }
            if (!e.data || e.data.type !== 'connect') {
                // Shouldn't matter, but you never know what the external page is doing
                return;
            }
            // This only ever runs once, so remove the handler once we know it's valid
            window.removeEventListener('message', listener);
            // We send this back to confirm to the client that there is actually a
            // controller listening for messages
            e.ports[0].start();
            e.ports[0].postMessage({
                type: 'confirmation',
                id: newConnection.id,
                urlForConnection: window.location.href
            });
            newConnection.setMessagePort(e.ports[0]);
            newConnection.state = "connected";
            // feels like this should be stored elsewhere but this works for now
            newConnection.addEventListener('close', () => {
                this._castWindow.close();
            });
        };
        window.addEventListener('message', listener);
        return Promise.resolve(newConnection);
    }
    reconnect() {
        // todo
        return Promise.resolve(null);
    }
}
exports.PresentationRequest = PresentationRequest;
