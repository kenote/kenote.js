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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChannelKey = void 0;
function getChannelKey(channels, routePath, name) {
    var e_1, _a;
    if (name === void 0) { name = 'key'; }
    try {
        for (var channels_1 = __values(channels), channels_1_1 = channels_1.next(); !channels_1_1.done; channels_1_1 = channels_1.next()) {
            var channel = channels_1_1.value;
            if (routePath.replace(/^\/|\/$/g, '') === channel.label) {
                return channel.key;
            }
            if (channel.children) {
                var __key = findChannelKey(channel.children, channel.key, routePath, name);
                if (__key) {
                    return __key;
                }
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (channels_1_1 && !channels_1_1.done && (_a = channels_1.return)) _a.call(channels_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return undefined;
}
exports.getChannelKey = getChannelKey;
function findChannelKey(navs, key, routePath, name) {
    var e_2, _a;
    if (name === void 0) { name = 'key'; }
    var __key;
    try {
        for (var navs_1 = __values(navs), navs_1_1 = navs_1.next(); !navs_1_1.done; navs_1_1 = navs_1.next()) {
            var nav = navs_1_1.value;
            if (nav.children) {
                var __nav = nav.children.find(function (o) { return o[name] === routePath; });
                if (__nav) {
                    return key;
                }
                else {
                    __key = findChannelKey(nav.children, key, routePath, name);
                }
            }
            else if (nav.route === routePath) {
                return key;
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (navs_1_1 && !navs_1_1.done && (_a = navs_1.return)) _a.call(navs_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return __key;
}
