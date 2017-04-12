// No guaranteed randomness or anything, but it'll do.
// http://stackoverflow.com/a/2117523
"use strict";
function default_1() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
