"use strict";
const eventtarget_1 = require('eventtarget');
class PresentationAvailability extends eventtarget_1.default {
    constructor(applicationId) {
        super();
        this.castStateChanged = this.castStateChanged.bind(this);
        this._instance = cast.framework.CastContext.getInstance();
        this._instance.setOptions({
            receiverApplicationId: applicationId,
            autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
        });
        this._instance.addEventListener(cast.framework.CastContextEventType.CAST_STATE_CHANGED, this.castStateChanged);
        this.value = this._instance.getCastState() !== cast.framework.CastState.NO_DEVICES_AVAILABLE;
    }
    castStateChanged(e) {
        let newValue = e.castState !== cast.framework.CastState.NO_DEVICES_AVAILABLE;
        if (newValue == this.value) {
            return;
        }
        this.value = newValue;
        this.dispatchEvent({
            type: 'change'
        });
    }
}
exports.PresentationAvailability = PresentationAvailability;
