"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EventTargetImplementation = require('eventtarget');
var PresentationConnectionEvents = (function (_super) {
    __extends(PresentationConnectionEvents, _super);
    function PresentationConnectionEvents() {
        var _this = this;
        _super.call(this);
        var events = ['connect', 'close', 'terminate', 'message'];
        events.forEach(function (eventName) {
            _this.addEventListener(eventName, function (e) {
                var func = _this['on' + eventName];
                if (func) {
                    func(e);
                }
            });
        });
    }
    Object.defineProperty(PresentationConnectionEvents.prototype, "state", {
        get: function () {
            return this._state;
        },
        set: function (value) {
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
        },
        enumerable: true,
        configurable: true
    });
    return PresentationConnectionEvents;
}(EventTargetImplementation));
exports.PresentationConnectionEvents = PresentationConnectionEvents;
