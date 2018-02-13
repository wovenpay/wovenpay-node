"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var url;
var initWovenPay = function (url) {
    _this.url = url;
    return _this;
};
exports.initWovenPay = initWovenPay;
var getAuthToken = function (email, password) {
    return fetch(_this.url, {
        method: 'POST',
        body: JSON.stringify({ email: email, password: password })
    });
};
exports.getAuthToken = getAuthToken;
