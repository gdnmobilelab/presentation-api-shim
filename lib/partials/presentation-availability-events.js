"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var eventtarget_1 = require('eventtarget');
var PresentationAvailabilityEvents = (function (_super) {
    __extends(PresentationAvailabilityEvents, _super);
    function PresentationAvailabilityEvents() {
        var _this = this;
        _super.call(this);
        this.addEventListener("change", function (e) {
            if (_this.onchange) {
                _this.onchange(e);
            }
        });
    }
    return PresentationAvailabilityEvents;
}(eventtarget_1.default));
exports.PresentationAvailabilityEvents = PresentationAvailabilityEvents;
