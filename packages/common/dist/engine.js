"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonEngine = void 0;
var CommonEngine = (function () {
    function CommonEngine() {
    }
    Object.defineProperty(CommonEngine.prototype, "name", {
        get: function () {
            return '';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommonEngine.prototype, "app", {
        get: function () {
            return this.__application;
        },
        enumerable: false,
        configurable: true
    });
    return CommonEngine;
}());
exports.CommonEngine = CommonEngine;
