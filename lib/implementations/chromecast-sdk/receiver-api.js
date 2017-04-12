"use strict";
let castLoadPromise = null;
function getReceiverAPI() {
    if (castLoadPromise) {
        return castLoadPromise;
    }
    return castLoadPromise = new Promise((fulfill, reject) => {
        let scriptTag = document.createElement("script");
        scriptTag.onload = function () {
            fulfill();
        };
        scriptTag.onerror = function (error) {
            reject(error);
        };
        scriptTag.setAttribute('src', '//www.gstatic.com/cast/sdk/libs/receiver/2.0.0/cast_receiver.js');
        document.head.appendChild(scriptTag);
    });
}
exports.getReceiverAPI = getReceiverAPI;
