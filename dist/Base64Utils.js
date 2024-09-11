"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Base64Utils = (function () {
    function Base64Utils() {
    }
    Base64Utils.isNodeEnv = function () {
        return (typeof process !== 'undefined' && process.versions != null && process.versions.node != null);
    };
    Base64Utils.encode = function (val) {
        if (Base64Utils.isNodeEnv()) {
            return Buffer.from(val, 'utf-8').toString('base64');
        }
        return btoa(encodeURIComponent(val).replace(/%([0-9A-F]{2})/g, function (match, p1) { return String.fromCharCode(Number('0x' + p1)); }));
    };
    Base64Utils.decode = function (val) {
        if (Base64Utils.isNodeEnv()) {
            return Buffer.from(val, 'base64').toString('utf-8');
        }
        return btoa(encodeURIComponent(val).replace(/%([0-9A-F]{2})/g, function (match, p1) { return String.fromCharCode(Number('0x' + p1)); }));
    };
    Base64Utils.isBase64 = function (v, opts) {
        if ((opts === null || opts === void 0 ? void 0 : opts.allowEmpty) === false && v === '')
            return false;
        var regex = '(?:[A-Za-z0-9+\\/]{4})*(?:[A-Za-z0-9+\\/]{2}==|[A-Za-z0-9+\/]{3}=)?';
        var mimeRegex = '(data:\\w+\\/[a-zA-Z\\+\\-\\.]+;base64,)';
        if ((opts === null || opts === void 0 ? void 0 : opts.mimeRequired) === true) {
            regex = mimeRegex + regex;
        }
        else if ((opts === null || opts === void 0 ? void 0 : opts.allowMime) === true) {
            regex = mimeRegex + '?' + regex;
        }
        if ((opts === null || opts === void 0 ? void 0 : opts.paddingRequired) === false) {
            regex = '(?:[A-Za-z0-9+\\/]{4})*(?:[A-Za-z0-9+\\/]{2}(==)?|[A-Za-z0-9+\\/]{3}=?)?';
        }
        return (new RegExp('^' + regex + '$', 'gi')).test(v);
    };
    Base64Utils.removeBase64Padding = function (base64Str) {
        return base64Str.replace(/=+$/, '');
    };
    Base64Utils.addBase64Padding = function (base64Str) {
        var padding = base64Str.length % 4;
        return padding ? base64Str + '==='.slice(0, 4 - padding) : base64Str;
    };
    Base64Utils.urlSafeToBase64 = function (urlSafeStr) {
        return urlSafeStr.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice(0, (4 - urlSafeStr.length % 4) % 4);
    };
    Base64Utils.base64ToUrlSafe = function (base64Str) {
        return base64Str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    };
    return Base64Utils;
}());
exports.default = Base64Utils;
