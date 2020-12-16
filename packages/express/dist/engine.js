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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceEngine = void 0;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var method_override_1 = __importDefault(require("method-override"));
var compression_1 = __importDefault(require("compression"));
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
    function ServiceEngine() {
        var _this = _super.call(this) || this;
        _this.toRoutes = router_1.toRoutes.bind(_this);
        _this.toRequestHandler = middleware_1.toRequestHandler.bind(_this);
        _this.toErrorHandler = middleware_1.toErrorHandler.bind(_this);
        _this.toMiddleware = middleware_1.toMiddleware.bind(_this);
        _this.errorhandler = errorhandler_1.default.bind(_this);
        _this.__application = express_1.default();
        _this.__application.use(body_parser_1.default.json({ limit: '1mb' }));
        _this.__application.use(body_parser_1.default.urlencoded({ extended: true, limit: '1mb' }));
        _this.__application.use(method_override_1.default());
        _this.__application.use(compression_1.default());
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
            var _a, _b;
            if (path) {
                var _c = options || {}, corsOptions = _c.cors, headers_1 = _c.headers;
                if (corsOptions) {
                    handlers = __spread([lodash_1.isPlainObject(corsOptions) ? cors_1.default(corsOptions) : cors_1.default()], handlers);
                }
                if (headers_1) {
                    handlers = __spread([function (req, res, next) {
                            var e_1, _a;
                            try {
                                for (var _b = __values(Object.entries(headers_1 || {})), _c = _b.next(); !_c.done; _c = _b.next()) {
                                    var _d = __read(_c.value, 2), name_1 = _d[0], value = _d[1];
                                    res.setHeader(name_1, value);
                                }
                            }
                            catch (e_1_1) { e_1 = { error: e_1_1 }; }
                            finally {
                                try {
                                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                                }
                                finally { if (e_1) throw e_1.error; }
                            }
                            return next();
                        }], handlers);
                }
                (_a = _this.__application).use.apply(_a, __spread([path], handlers));
            }
            else {
                (_b = _this.__application).use.apply(_b, __spread(handlers));
            }
        };
    };
    return ServiceEngine;
}(common_1.CommonEngine));
exports.ServiceEngine = ServiceEngine;