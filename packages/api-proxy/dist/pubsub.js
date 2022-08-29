"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ioredis_1 = __importDefault(require("ioredis"));
var js_yaml_1 = __importDefault(require("js-yaml"));
var lodash_1 = require("lodash");
var Pubsub = (function () {
    function Pubsub(options) {
        this.__pub = new ioredis_1.default(options);
        this.__sub = new ioredis_1.default(options);
    }
    Pubsub.prototype.publish = function (message, data) {
        if ((0, lodash_1.isBuffer)(data)) {
            return this.__pub.publishBuffer(message, data);
        }
        return this.__pub.publish(message, js_yaml_1.default.dump(data));
    };
    Pubsub.prototype.subscribe = function (message, next) {
        var _a;
        this.__sub.on('message', function (name, data) {
            if ((0, lodash_1.isBuffer)(data)) {
                return next(name, data);
            }
            return next(name, js_yaml_1.default.load(data));
        });
        var args = (0, lodash_1.isArray)(message) ? message : [message];
        return (_a = this.__sub).subscribe.apply(_a, __spreadArray([], __read(args), false));
    };
    Pubsub.prototype.psubscribe = function (message, next) {
        var _a;
        this.__sub.on('pmessage', function (pattern, name, data) {
            if ((0, lodash_1.isBuffer)(data)) {
                return next(name, data);
            }
            return next(name, js_yaml_1.default.load(data));
        });
        var args = (0, lodash_1.isArray)(message) ? message : [message];
        return (_a = this.__sub).psubscribe.apply(_a, __spreadArray([], __read(args), false));
    };
    Pubsub.getInstance = function (options) {
        if (!Pubsub.instance) {
            Pubsub.instance = new Pubsub(options);
        }
        return Pubsub.instance;
    };
    return Pubsub;
}());
exports.default = Pubsub;
