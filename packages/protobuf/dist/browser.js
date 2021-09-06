"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Browser = void 0;
var pako_1 = __importDefault(require("pako"));
var python_struct_1 = __importDefault(require("python-struct"));
var lodash_1 = require("lodash");
var zlibOptions = { windowBits: 15, memLevel: 8 };
var compressData = function (buffer, options) {
    if (options === void 0) { options = zlibOptions; }
    return pako_1.default.gzip(buffer, options);
};
var decompressData = function (buffer) {
    if (buffer instanceof ArrayBuffer) {
        var inflator = new pako_1.default.Inflate();
        inflator.push(buffer, true);
        return inflator.result;
    }
    else {
        return pako_1.default.ungzip(buffer);
    }
};
var Browser = (function () {
    function Browser(options) {
        this.__Options = options;
    }
    Object.defineProperty(Browser.prototype, "socket", {
        get: function () {
            return this.__Options.socket;
        },
        enumerable: false,
        configurable: true
    });
    Browser.prototype.encode = function (msgtype, params, requestType) {
        var e_1, _a;
        var encode = this.__Options.encode;
        var values = {};
        try {
            for (var _b = __values(Object.entries(encode.fields)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), key = _d[0], val = _d[1];
                lodash_1.set(values, key, val);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        lodash_1.set(values, encode.msgtype, msgtype);
        var payloadMessage = this.getMessageType(requestType !== null && requestType !== void 0 ? requestType : this.__Options.requestType);
        lodash_1.set(values, encode.payload, payloadMessage === null || payloadMessage === void 0 ? void 0 : payloadMessage.encode(payloadMessage === null || payloadMessage === void 0 ? void 0 : payloadMessage.create(params)).finish());
        var message = this.getMessageType(encode.type);
        var data = message === null || message === void 0 ? void 0 : message.encode(message === null || message === void 0 ? void 0 : message.create(values)).finish();
        return makeData(data, lodash_1.merge(zlibOptions, encode.zlibOptions));
    };
    Browser.prototype.decode = function (buffer, decodeOptions) {
        var e_2, _a;
        var decode = lodash_1.merge(decodeOptions, this.__Options.decode);
        var ungzipBuffer = decompressData(buffer);
        var data = this.getMessageType(decode === null || decode === void 0 ? void 0 : decode.type).decode(ungzipBuffer);
        try {
            for (var _b = __values(Object.entries(data)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), key = _d[0], val = _d[1];
                if (val instanceof Uint8Array && lodash_1.get(decode, ['fields', key])) {
                    data[key] = this.getMessageType(lodash_1.get(decode, ['fields', key])).decode(val);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return data;
    };
    Browser.prototype.getMessageType = function (name) {
        var message = lodash_1.get(this.__Options.socket, name);
        if ('create' in message === false)
            return;
        if ('encode' in message === false)
            return;
        if ('decode' in message === false)
            return;
        return message;
    };
    return Browser;
}());
exports.Browser = Browser;
function makeData(buffer, options) {
    var zlibBuffer = compressData(buffer, options);
    var head = python_struct_1.default.pack('!i', zlibBuffer.length);
    return Buffer.concat([head, zlibBuffer]);
}
