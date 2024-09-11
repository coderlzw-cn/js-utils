"use strict";
var StringUtils = (function () {
    function StringUtils() {
    }
    var _a;
    _a = StringUtils;
    StringUtils.isEmpty = function (str) { return str === null || str.length === 0; };
    StringUtils.isBlank = function (str) { return str == null || str.trim().length === 0; };
    StringUtils.capitalizeFirstLetter = function (str) { return str.charAt(0).toUpperCase() + str.slice(1); };
    StringUtils.uncapitalizeFirstLetter = function (str) { return str.charAt(0).toLowerCase() + str.slice(1); };
    StringUtils.extractStringByRegex = function (str, regex, returnOriginal) {
        if (returnOriginal === void 0) { returnOriginal = false; }
        var match = str.match(regex);
        return match ? (returnOriginal ? match[0] : match[1]) : null;
    };
    StringUtils.toUpperCase = function (str) { return str.toUpperCase(); };
    StringUtils.toLowerCase = function (str) { return str.toLowerCase(); };
    StringUtils.trim = function (str) { return str.trim(); };
    StringUtils.repeat = function (str, n) { return str.repeat(n); };
    StringUtils.base64Encode = function (str) { return btoa(encodeURIComponent(str)); };
    StringUtils.base64Decode = function (str) { return decodeURIComponent(atob(str)); };
    StringUtils.removeMiddleSpaces = function (str, removeEnds) {
        if (removeEnds === void 0) { removeEnds = false; }
        return removeEnds ? str.trim().replace(/\s/g, '') : str.replace(/\s/g, '');
    };
    StringUtils.isNumeric = function (str) { return /^\d+$/.test(str); };
    StringUtils.stringToNumber = function (str) {
        if (!_a.isNumeric(str)) {
            return NaN;
        }
        return Number(str);
    };
    StringUtils.stringToBigInt = function (str) {
        if (!/^\d+$/.test(str)) {
            throw new Error("Invalid input: string must represent a non-negative integer.");
        }
        return BigInt(str);
    };
    StringUtils.isPalindrome = function (str) {
        var reversedStr = str.split('').reverse().join('');
        return str === reversedStr;
    };
    StringUtils.mostFrequentCharacters = function (str) {
        var charMap = {};
        for (var _i = 0, str_1 = str; _i < str_1.length; _i++) {
            var char = str_1[_i];
            charMap[char] = charMap[char] + 1 || 1;
        }
        var maxCount = Math.max.apply(Math, Object.values(charMap));
        return Object.keys(charMap).filter(function (char) { return charMap[char] === maxCount; });
    };
    StringUtils.uniqueCharacters = function (str) {
        var charCount = {};
        for (var _i = 0, str_2 = str; _i < str_2.length; _i++) {
            var char = str_2[_i];
            charCount[char] = (charCount[char] || 0) + 1;
        }
        return Object.keys(charCount).filter(function (char) { return charCount[char] === 1; });
    };
    return StringUtils;
}());
