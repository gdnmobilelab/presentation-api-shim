"use strict";
const ChromecastSDKLib = require('./implementations/chromecast-sdk');
const OpenWindowLib = require('./implementations/open-window');
// There must be a better way of doing this...
exports.ChromecastSDK = ChromecastSDKLib;
exports.OpenWindow = OpenWindowLib;
