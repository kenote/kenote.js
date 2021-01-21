"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeMaps = exports.initMaps = exports.dataNodeProxy = exports.DataNodeProxy = void 0;
var rule_judgment_1 = __importDefault(require("rule-judgment"));
var lodash_1 = require("lodash");
var DataNodeProxy = (function () {
    function DataNodeProxy(data) {
        this.__data = lodash_1.cloneDeep(data);
    }
    Object.defineProperty(DataNodeProxy.prototype, "data", {
        get: function () {
            return this.__data;
        },
        enumerable: false,
        configurable: true
    });
    DataNodeProxy.prototype.find = function (query, data) {
        var e_1, _a;
        if (data === void 0) { data = this.__data; }
        var __data;
        try {
            for (var data_1 = __values(data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
                var item = data_1_1.value;
                if (!lodash_1.isEmpty(query) && rule_judgment_1.default(__assign({}, query))(item)) {
                    __data = item;
                    return __data;
                }
                else if (item.children) {
                    __data = this.find(query, item.children);
                    if (__data)
                        return __data;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (data_1_1 && !data_1_1.done && (_a = data_1.return)) _a.call(data_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return __data;
    };
    DataNodeProxy.prototype.add = function (key, items, data) {
        var _a;
        if (data === void 0) { data = this.__data; }
        var __items = lodash_1.isArray(items) ? items : [items];
        if (!key) {
            data.push.apply(data, __spread(__items));
            return;
        }
        var __data = this.find({ key: key }, data);
        if (__data) {
            if (!__data.children) {
                __data.children = [];
            }
            (_a = __data.children) === null || _a === void 0 ? void 0 : _a.push.apply(_a, __spread(__items));
        }
    };
    DataNodeProxy.prototype.remove = function (key, data) {
        var e_2, _a;
        if (data === void 0) { data = this.__data; }
        var __data = data;
        try {
            for (var __data_1 = __values(__data), __data_1_1 = __data_1.next(); !__data_1_1.done; __data_1_1 = __data_1.next()) {
                var item = __data_1_1.value;
                if (item.key === key) {
                    lodash_1.remove(__data, function (o) { return o.key === key; });
                    return __data;
                }
                else if (item.children) {
                    var __children = this.remove(key, item.children);
                    if (!lodash_1.isEqual(__children, item.children))
                        return __data;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (__data_1_1 && !__data_1_1.done && (_a = __data_1.return)) _a.call(__data_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return __data;
    };
    DataNodeProxy.prototype.update = function (key, payload, data) {
        var e_3, _a;
        if (data === void 0) { data = this.__data; }
        var __data = data;
        var i = 0;
        try {
            for (var __data_2 = __values(__data), __data_2_1 = __data_2.next(); !__data_2_1.done; __data_2_1 = __data_2.next()) {
                var item = __data_2_1.value;
                if (item.key === key) {
                    __data[i] = lodash_1.merge(item, payload);
                    return __data;
                }
                else if (item.children) {
                    var children = lodash_1.cloneDeep(item.children);
                    var __children = this.update(key, payload, item.children);
                    if (!lodash_1.isEqual(__children, children))
                        return __data;
                }
                i++;
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (__data_2_1 && !__data_2_1.done && (_a = __data_2.return)) _a.call(__data_2);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return __data;
    };
    return DataNodeProxy;
}());
exports.DataNodeProxy = DataNodeProxy;
exports.dataNodeProxy = function (data) { return new DataNodeProxy(data); };
function initMaps(data, maps) {
    if (maps === void 0) { maps = []; }
    data.forEach(function (item, __v) {
        item.maps = __spread(maps);
        item.maps.push(lodash_1.pick(item, ['key', 'name']));
        if (item.children) {
            return initMaps(item.children, item.maps);
        }
    });
    return data;
}
exports.initMaps = initMaps;
function removeMaps(data) {
    data.forEach(function (item, __v) {
        lodash_1.unset(item, 'maps');
        if (item.children) {
            return removeMaps(item.children);
        }
    });
    return data;
}
exports.removeMaps = removeMaps;
