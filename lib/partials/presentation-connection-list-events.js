"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var eventtarget_1 = require('eventtarget');
var PresentationConnectionListEvents = (function (_super) {
    __extends(PresentationConnectionListEvents, _super);
    function PresentationConnectionListEvents() {
        var _this = this;
        _super.call(this);
        this.addEventListener("connectionavailable", function (e) {
            if (_this.onconnectionavailable) {
                _this.onconnectionavailable(e);
            }
        });
    }
    return PresentationConnectionListEvents;
}(eventtarget_1.default));
exports.PresentationConnectionListEvents = PresentationConnectionListEvents;
