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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var Context = (function () {
    function Context(ctx) {
        var _this = this;
        this.send = function (body) {
            _this.__ctx.body = body;
        };
        this.status = function (code) {
            _this.__ctx.status = code;
            return _this;
        };
        this.json = this.send;
        this.render = function (view, options) { return _this.__ctx.render(view, options); };
        this.redirect = function (url) { return _this.__ctx.redirect(url); };
        this.cookie = function (name, value, options) { return _this.__ctx.cookies.set(name, value, options); };
        this.next = function (error) {
            _this.__ctx.app.emit('error', error, _this);
        };
        this.throw = function () {
            var _a;
            var properties = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                properties[_i] = arguments[_i];
            }
            return (_a = _this.__ctx).throw.apply(_a, __spread(properties));
        };
        this.__ctx = ctx;
    }
    Object.defineProperty(Context.prototype, "app", {
        get: function () {
            return this.__ctx.app;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Context.prototype, "context", {
        get: function () {
            return this.__ctx;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Context.prototype, "payload", {
        get: function () {
            return this.__ctx['$__payload'];
        },
        set: function (value) {
            this.__ctx['$__payload'] = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Context.prototype, "method", {
        get: function () {
            return this.__ctx.method;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Context.prototype, "protocol", {
        get: function () {
            return this.__ctx.protocol;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Context.prototype, "path", {
        get: function () {
            return this.__ctx.path;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Context.prototype, "url", {
        get: function () {
            return this.__ctx.url;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Context.prototype, "originalUrl", {
        get: function () {
            return this.__ctx.originalUrl;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Context.prototype, "hostname", {
        get: function () {
            return this.__ctx.hostname;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Context.prototype, "ip", {
        get: function () {
            return this.__ctx.ip;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Context.prototype, "ips", {
        get: function () {
            return this.__ctx.ips;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Context.prototype, "headers", {
        get: function () {
            return this.__ctx.headers;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Context.prototype, "params", {
        get: function () {
            return this.__ctx.params;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Context.prototype, "query", {
        get: function () {
            return this.__ctx.query;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Context.prototype, "body", {
        get: function () {
            return this.__ctx.request.body;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Context.prototype, "cookies", {
        get: function () {
            var cookies = lodash_1.compact((this.__ctx.headers.cookie || '').split(/\;/)).map(lodash_1.trim).map(function (s) { return s.split(/\=/); });
            return lodash_1.fromPairs(cookies);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Context.prototype, "statusCode", {
        get: function () {
            return this.__ctx.response.status;
        },
        enumerable: false,
        configurable: true
    });
    return Context;
}());
exports.default = Context;
