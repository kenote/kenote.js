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
    Object.defineProperty(CommonEngine.prototype, "staticDir", {
        set: function (value) { },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommonEngine.prototype, "template", {
        set: function (value) { },
        enumerable: false,
        configurable: true
    });
    CommonEngine.prototype.register = function () {
        var handlers = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            handlers[_i] = arguments[_i];
        }
        return function (path, options) { };
    };
    return CommonEngine;
}());
exports.CommonEngine = CommonEngine;
