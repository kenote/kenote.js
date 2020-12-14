"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Context = (function () {
    function Context(req, res) {
        var _this = this;
        this.send = function (body) { return _this.__res.send(body); };
        this.status = function (code) { return _this.__res.status(code); };
        this.sendFile = function (path) { return new Promise(function (resolve, reject) {
            _this.__res.sendFile(path, function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(null);
                }
            });
        }); };
        this.json = function (body) { return _this.__res.json(body); };
        this.jsonp = function (body) { return _this.__res.jsonp(body); };
        this.render = function (view, options) { return new Promise(function (resolve, reject) {
            _this.__res.render(view, options, function (err, html) {
                if (err) {
                    reject(err);
                }
                else {
                    _this.__res.send(html);
                }
            });
        }); };
        this.redirect = function (url) { return _this.__res.redirect(url); };
        this.cookie = function (name, value, options) { return _this.__res.cookie(name, value, options || {}); };
        this.__req = req;
        this.__res = res;
    }
    Object.defineProperty(Context.prototype, "app", {
        get: function () {
            return this.__req.app;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Context.prototype, "req", {
        get: function () {
            return this.__req;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Context.prototype, "res", {
        get: function () {
            return this.__res;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Context.prototype, "payload", {
        get: function () {
            return this.__req['$__payload'];
        },
        set: function (value) {
            this.__req['$__payload'] = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Context.prototype, "user", {
        get: function () {
            return this.__req['user'];
        },
        set: function (value) {
            this.__req['user'] = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Context.prototype, "method", {
        get: function () {
            return this.__req.method;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Context.prototype, "protocol", {
        get: function () {
            return this.__req.protocol;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Context.prototype, "baseUrl", {
        get: function () {
            return this.__req.baseUrl;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Context.prototype, "path", {
        get: function () {
            return this.__req.path;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Context.prototype, "url", {
        get: function () {
            return this.__req.url;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Context.prototype, "originalUrl", {
        get: function () {
            return this.__req.originalUrl;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Context.prototype, "hostname", {
        get: function () {
            return this.__req.hostname;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Context.prototype, "ip", {
        get: function () {
            return this.__req.ip;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Context.prototype, "ips", {
        get: function () {
            return this.__req.ips;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Context.prototype, "headers", {
        get: function () {
            return this.__req.headers;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Context.prototype, "params", {
        get: function () {
            return this.__req.params;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Context.prototype, "query", {
        get: function () {
            return this.__req.query;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Context.prototype, "body", {
        get: function () {
            return this.__req.body;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Context.prototype, "cookies", {
        get: function () {
            return this.__req.cookies;
        },
        enumerable: false,
        configurable: true
    });
    return Context;
}());
exports.default = Context;
