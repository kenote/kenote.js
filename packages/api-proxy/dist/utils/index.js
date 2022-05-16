"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHeader = exports.runService = exports.parsePlainObject = exports.getServiceModules = void 0;
var parse_string_1 = require("parse-string");
var lodash_1 = require("lodash");
var config_1 = require("@kenote/config");
var service_1 = require("./service");
Object.defineProperty(exports, "getServiceModules", { enumerable: true, get: function () { return service_1.getServiceModules; } });
function parsePlainObject(value, parse) {
    return function (customize) {
        var _a, _b, _c;
        var isJsonText = false;
        if ((0, lodash_1.isString)(value) && (0, config_1.isJson)(value)) {
            value = JSON.parse(value);
            isJsonText = true;
        }
        if ((0, lodash_1.isPlainObject)(value)) {
            value = (0, lodash_1.get)(value, (_a = parse === null || parse === void 0 ? void 0 : parse.path) !== null && _a !== void 0 ? _a : '', value);
        }
        if ((0, lodash_1.isArray)(parse === null || parse === void 0 ? void 0 : parse.options)) {
            value = (0, parse_string_1.parseBody)((_b = parse === null || parse === void 0 ? void 0 : parse.options) !== null && _b !== void 0 ? _b : [], customize !== null && customize !== void 0 ? customize : {})(value);
        }
        else if (parse === null || parse === void 0 ? void 0 : parse.options) {
            value = (0, parse_string_1.parseData)(parse.options, customize !== null && customize !== void 0 ? customize : {})((0, lodash_1.isString)(value) ? value : (0, parse_string_1.toValue)('string')(value));
        }
        if (parse === null || parse === void 0 ? void 0 : parse.exec) {
            value = (_c = (0, lodash_1.get)(customize, parse.exec)) === null || _c === void 0 ? void 0 : _c(value);
        }
        return isJsonText ? JSON.stringify(value, null, 2) : value;
    };
}
exports.parsePlainObject = parsePlainObject;
function runService(name, args) {
    var _this = this;
    if (args === void 0) { args = []; }
    return function (service, ctx) { return __awaiter(_this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            if (!(0, lodash_1.get)(service, name)) {
                return [2, null];
            }
            ctx && args.splice(0, 0, ctx);
            return [2, (_a = (0, lodash_1.get)(service, name)) === null || _a === void 0 ? void 0 : _a.apply(void 0, __spreadArray([], __read(args), false))];
        });
    }); };
}
exports.runService = runService;
function getHeader(name) {
    return function (header) {
        var e_1, _a;
        try {
            for (var header_1 = __values(header), header_1_1 = header_1.next(); !header_1_1.done; header_1_1 = header_1.next()) {
                var item = header_1_1.value;
                var _b = __read(item.split(/\:/), 2), key = _b[0], val = _b[1];
                if (key === name) {
                    return val;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (header_1_1 && !header_1_1.done && (_a = header_1.return)) _a.call(header_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
}
exports.getHeader = getHeader;
