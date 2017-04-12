"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var eventtarget_1 = require('eventtarget');
var PresentationRequestEvents = (function (_super) {
    __extends(PresentationRequestEvents, _super);
    function PresentationRequestEvents() {
        var _this = this;
        _super.call(this);
        this.addEventListener("connectionavailable", function (e) {
            if (_this.onconnectionavailable) {
                _this.onconnectionavailable(e);
            }
        });
    }
    return PresentationRequestEvents;
}(eventtarget_1.default));
exports.PresentationRequestEvents = PresentationRequestEvents;
