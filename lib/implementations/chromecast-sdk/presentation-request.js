"use strict";
const eventtarget_1 = require('eventtarget');
const presentation_controller_connection_1 = require('./presentation-controller-connection');
const presentation_availability_1 = require('./presentation-availability');
const create_guid_1 = require('../../util/create-guid');
const cast_api_1 = require('./cast-api');
class PresentationRequest extends eventtarget_1.default {
    constructor(urls) {
        super();
        let urlArray = urls instanceof Array ? urls : [urls];
        let castAppID = urlArray
            .map((u) => /__castAppId__=(\w*)/.exec(u))
            .filter((u) => u != null && u[1])[0];
        if (!castAppID) {
            throw new Error("Must provide a Cast URL to constructor");
        }
        this._targetAppID = castAppID[1];
        this._targetURL = castAppID.input;
        // Don't strictly speaking have to do it here, but might as well
        // preload to get ahead of the getAvailability() call.
        cast_api_1.getCastAPI();
    }
    getAvailability() {
        return cast_api_1.getCastAPI()
            .then(() => {
            return new presentation_availability_1.PresentationAvailability(this._targetAppID);
        });
    }
    start() {
        return cast_api_1.getCastAPI()
            .then(() => {
            return new presentation_controller_connection_1.PresentationControllerConnection(create_guid_1.default(), this._targetURL);
        });
    }
    reconnect() {
        throw new Error("Not implemented yet");
    }
}
exports.PresentationRequest = PresentationRequest;
