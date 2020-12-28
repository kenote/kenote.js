"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.ServiceEngine = void 0;
var koa_1 = __importDefault(require("koa"));
var koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
var koa_compress_1 = __importDefault(require("koa-compress"));
var koa_compose_1 = __importDefault(require("koa-compose"));
var koa_static_cache_1 = __importDefault(require("koa-static-cache"));
var router_1 = __importDefault(require("@koa/router"));
var cors_1 = __importDefault(require("@koa/cors"));
var koa_views_1 = __importDefault(require("koa-views"));
var lodash_1 = require("lodash");
var common_1 = require("@kenote/common");
var middleware_1 = require("./middleware");
var router_2 = require("./router");
var errorhandler_1 = __importDefault(require("./errorhandler"));
var ServiceEngine = (function (_super) {
    __extends(ServiceEngine, _super);
    function ServiceEngine(options) {
        var _this = _super.call(this) || this;
        _this.toRoutes = router_2.toRoutes.bind(_this);
        _this.toRequestHandler = middleware_1.toRequestHandler.bind(_this);
        _this.toErrorHandler = middleware_1.toErrorHandler.bind(_this);
        _this.toMiddleware = middleware_1.toMiddleware.bind(_this);
        _this.errorhandler = errorhandler_1.default.bind(_this);
        var _a = options || {}, bodyParserOptions = _a.bodyParser, compressOptions = _a.compress, keys = _a.keys;
        _this.__application = new koa_1.default();
        _this.__application.use(koa_bodyparser_1.default(bodyParserOptions));
        _this.__application.use(koa_compress_1.default(compressOptions));
        _this.__application.keys = keys || ['keys', 'keykeys'];
        return _this;
    }
    Object.defineProperty(ServiceEngine.prototype, "name", {
        get: function () {
            return 'koa';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ServiceEngine.prototype, "staticDir", {
        set: function (value) {
            var rootDir = value.rootDir, rootPath = value.rootPath, options = value.options;
            this.__application.use(koa_static_cache_1.default(rootDir, __assign(__assign({}, options), { prefix: rootPath || '/' })));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ServiceEngine.prototype, "template", {
        set: function (value) {
            var _a;
            var viewDir = value.viewDir, engine = value.engine, extension = value.extension;
            this.__application.context.views = value;
            this.__application.use(koa_views_1.default(viewDir, {
                extension: extension,
                map: (_a = {},
                    _a[extension] = engine || 'lodash',
                    _a)
            }));
        },
        enumerable: false,
        configurable: true
    });
    ServiceEngine.prototype.register = function () {
        var _this = this;
        var handler = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            handler[_i] = arguments[_i];
        }
        return function (path, options) {
            var e_1, _a;
            var _b = options || {}, corsOptions = _b.cors, headers = _b.headers;
            if (path === 'error') {
                _this.__application.on(path, handler[0]);
            }
            else if (path === 'passport') {
                try {
                    for (var handler_1 = __values(handler), handler_1_1 = handler_1.next(); !handler_1_1.done; handler_1_1 = handler_1.next()) {
                        var _handler = handler_1_1.value;
                        _this.__application.use(_handler);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (handler_1_1 && !handler_1_1.done && (_a = handler_1.return)) _a.call(handler_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            else {
                var router_3;
                var handlers = handler.map(function (__handler) {
                    if (__handler instanceof router_1.default) {
                        router_3 = __handler;
                        if (path) {
                            __handler.prefix(path);
                        }
                        return __handler.routes();
                    }
                    return __handler;
                });
                if (corsOptions) {
                    handlers = __spread([lodash_1.isPlainObject(corsOptions) ? cors_1.default(corsOptions) : cors_1.default()], handlers);
                }
                if (headers) {
                    handlers = __spread([function (ctx, next) {
                            var e_2, _a;
                            try {
                                for (var _b = __values(Object.entries(headers || {})), _c = _b.next(); !_c.done; _c = _b.next()) {
                                    var _d = __read(_c.value, 2), name_1 = _d[0], value = _d[1];
                                    ctx.append(name_1, value);
                                }
                            }
                            catch (e_2_1) { e_2 = { error: e_2_1 }; }
                            finally {
                                try {
                                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                                }
                                finally { if (e_2) throw e_2.error; }
                            }
                            return next();
                        }], handlers);
                }
                _this.__application.use(koa_compose_1.default(handlers));
                if (router_3) {
                    _this.__application.use(router_3.allowedMethods());
                }
            }
        };
    };
    return ServiceEngine;
}(common_1.CommonEngine));
exports.ServiceEngine = ServiceEngine;
