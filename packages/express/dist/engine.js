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
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var method_override_1 = __importDefault(require("method-override"));
var compression_1 = __importDefault(require("compression"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var express_static_gzip_1 = __importDefault(require("express-static-gzip"));
var lodash_1 = require("lodash");
var cors_1 = __importDefault(require("cors"));
var common_1 = require("@kenote/common");
var consolidate_1 = __importDefault(require("consolidate"));
var middleware_1 = require("./middleware");
var router_1 = require("./router");
var errorhandler_1 = __importDefault(require("errorhandler"));
var ServiceEngine = (function (_super) {
    __extends(ServiceEngine, _super);
    function ServiceEngine(options) {
        var _this = _super.call(this) || this;
        _this.toRoutes = router_1.toRoutes.bind(_this);
        _this.toRequestHandler = middleware_1.toRequestHandler.bind(_this);
        _this.toErrorHandler = middleware_1.toErrorHandler.bind(_this);
        _this.toMiddleware = middleware_1.toMiddleware.bind(_this);
        _this.errorhandler = errorhandler_1.default.bind(_this);
        var _a = options || {}, bodyParserOptions = _a.bodyParser, compressOptions = _a.compress, keys = _a.keys;
        var _b = bodyParserOptions || {}, json = _b.json, urlencoded = _b.urlencoded, text = _b.text, raw = _b.raw;
        _this.__application = express_1.default();
        _this.__application.use(body_parser_1.default.json(__assign({ limit: '1mb' }, json)));
        _this.__application.use(body_parser_1.default.urlencoded(__assign({ extended: true, limit: '1mb' }, urlencoded)));
        _this.__application.use(body_parser_1.default.text(__assign({ limit: '1mb' }, text)));
        _this.__application.use(body_parser_1.default.raw(__assign({ limit: '1mb' }, raw)));
        _this.__application.use(method_override_1.default());
        _this.__application.use(compression_1.default(compressOptions));
        _this.__application.use(cookie_parser_1.default(keys || ['keys', 'keykeys']));
        return _this;
    }
    Object.defineProperty(ServiceEngine.prototype, "name", {
        get: function () {
            return 'express';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ServiceEngine.prototype, "staticDir", {
        set: function (value) {
            var rootDir = value.rootDir, rootPath = value.rootPath, options = value.options;
            this.__application.use(rootPath || '/', express_static_gzip_1.default(rootDir, options || {}));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ServiceEngine.prototype, "template", {
        set: function (value) {
            var viewDir = value.viewDir, engine = value.engine, extension = value.extension;
            this.__application.engine(extension, consolidate_1.default[engine || 'lodash']);
            this.__application.set('views', viewDir);
            this.__application.set('view engine', extension);
        },
        enumerable: false,
        configurable: true
    });
    ServiceEngine.prototype.register = function () {
        var _this = this;
        var handlers = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            handlers[_i] = arguments[_i];
        }
        return function (path, options) {
            var e_1, _a, _b, _c;
            if (path === 'passport') {
                try {
                    for (var handlers_1 = __values(handlers), handlers_1_1 = handlers_1.next(); !handlers_1_1.done; handlers_1_1 = handlers_1.next()) {
                        var handler = handlers_1_1.value;
                        _this.__application.use(handler);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (handlers_1_1 && !handlers_1_1.done && (_a = handlers_1.return)) _a.call(handlers_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            else if (path) {
                var _d = options || {}, corsOptions = _d.cors, headers_1 = _d.headers;
                if (corsOptions) {
                    handlers = __spread([lodash_1.isPlainObject(corsOptions) ? cors_1.default(corsOptions) : cors_1.default()], handlers);
                }
                if (headers_1) {
                    handlers = __spread([function (req, res, next) {
                            var e_2, _a;
                            try {
                                for (var _b = __values(Object.entries(headers_1 || {})), _c = _b.next(); !_c.done; _c = _b.next()) {
                                    var _d = __read(_c.value, 2), name_1 = _d[0], value = _d[1];
                                    res.setHeader(name_1, value);
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
                (_b = _this.__application).use.apply(_b, __spread([path], handlers));
            }
            else {
                (_c = _this.__application).use.apply(_c, __spread(handlers));
            }
        };
    };
    return ServiceEngine;
}(common_1.CommonEngine));
exports.ServiceEngine = ServiceEngine;
