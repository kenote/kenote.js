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
var ServiceEngine = (function () {
    function ServiceEngine() {
        var _this = this;
        this.use = function () {
            var _a;
            var handlers = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                handlers[_i] = arguments[_i];
            }
            return (_a = _this.__application).use.apply(_a, __spread(handlers));
        };
        this.__application = express_1.default();
        this.__application.use(body_parser_1.default.json({ limit: '1mb' }));
        this.__application.use(body_parser_1.default.urlencoded({ extended: true, limit: '1mb' }));
        this.__application.use(method_override_1.default());
        this.__application.use(compression_1.default());
    }
    Object.defineProperty(ServiceEngine.prototype, "name", {
        get: function () {
            return 'express';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ServiceEngine.prototype, "app", {
        get: function () {
            return this.__application;
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
            var viewDir = value.viewDir, engine = value.engine, configure = value.configure;
            this.__application.set('views', viewDir);
            this.__application.set('view engine', engine);
            configure(this.__application);
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
        return function (path) {
            var _a, _b;
            if (path) {
                (_a = _this.__application).use.apply(_a, __spread([path], handlers));
            }
            else {
                (_b = _this.__application).use.apply(_b, __spread(handlers));
            }
        };
    };
    return ServiceEngine;
}());
exports.ServiceEngine = ServiceEngine;
