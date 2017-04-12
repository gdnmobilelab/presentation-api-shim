"use strict";
var presentation_request_1 = require('./chromecast-sdk/presentation-request');
exports.PresentationRequest = presentation_request_1.PresentationRequest;
const presentation_receiver_1 = require('./chromecast-sdk/presentation-receiver');
function getReceiver() {
    return new presentation_receiver_1.PresentationReceiver();
}
exports.getReceiver = getReceiver;
