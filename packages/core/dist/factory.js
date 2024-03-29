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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerFactory = void 0;
var module_1 = require("./module");
var metadata_1 = require("./metadata");
var lodash_1 = require("lodash");
var ServerFactoryStatic = (function () {
    function ServerFactoryStatic(ServiceEngine) {
        this.__engine = ServiceEngine;
    }
    Object.defineProperty(ServerFactoryStatic.prototype, "engine", {
        get: function () {
            return this.__engine;
        },
        enumerable: false,
        configurable: true
    });
    ServerFactoryStatic.prototype.create = function (module) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var $__engine, _b, staticServer, routeController, templateOptions, httpException, middleware, plugins, ssrPlugins, statics, options, _c, _d, _e, rootPath, rootDir, plugins_1, plugins_1_1, item, __path, middleware_1, middleware_1_1, item, routeController_1, routeController_1_1, item, ssrPlugins_1, ssrPlugins_1_1, item, handler, prescript, prefix, e_1_1, notFound, exception, path, path, errorhandler;
            var e_2, _f, e_3, _g, e_4, _h, e_5, _j, e_1, _k;
            return __generator(this, function (_l) {
                switch (_l.label) {
                    case 0: return [4, module_1.loadModules(module)];
                    case 1:
                        _l.sent();
                        $__engine = this.__engine;
                        _b = metadata_1.getMetadataArgsStorage().application, staticServer = _b.staticServer, routeController = _b.routeController, templateOptions = _b.templateOptions, httpException = _b.httpException, middleware = _b.middleware, plugins = _b.plugins, ssrPlugins = _b.ssrPlugins;
                        if (staticServer) {
                            statics = staticServer.statics, options = staticServer.options;
                            try {
                                for (_c = __values(Object.entries(statics)), _d = _c.next(); !_d.done; _d = _c.next()) {
                                    _e = __read(_d.value, 2), rootPath = _e[0], rootDir = _e[1];
                                    $__engine.staticDir = { rootDir: rootDir, rootPath: rootPath, options: options };
                                }
                            }
                            catch (e_2_1) { e_2 = { error: e_2_1 }; }
                            finally {
                                try {
                                    if (_d && !_d.done && (_f = _c.return)) _f.call(_c);
                                }
                                finally { if (e_2) throw e_2.error; }
                            }
                        }
                        if (templateOptions) {
                            $__engine.template = templateOptions;
                        }
                        if (plugins) {
                            try {
                                for (plugins_1 = __values(plugins), plugins_1_1 = plugins_1.next(); !plugins_1_1.done; plugins_1_1 = plugins_1.next()) {
                                    item = plugins_1_1.value;
                                    __path = item[0].name === 'initialize' ? 'passport' : undefined;
                                    $__engine.register.apply($__engine, __spread(item))(__path);
                                }
                            }
                            catch (e_3_1) { e_3 = { error: e_3_1 }; }
                            finally {
                                try {
                                    if (plugins_1_1 && !plugins_1_1.done && (_g = plugins_1.return)) _g.call(plugins_1);
                                }
                                finally { if (e_3) throw e_3.error; }
                            }
                        }
                        if (middleware && lodash_1.isFunction($__engine.toMiddleware)) {
                            try {
                                for (middleware_1 = __values(middleware), middleware_1_1 = middleware_1.next(); !middleware_1_1.done; middleware_1_1 = middleware_1.next()) {
                                    item = middleware_1_1.value;
                                    $__engine.register($__engine.toMiddleware(item.methods, (_a = item.options) === null || _a === void 0 ? void 0 : _a.headers))();
                                }
                            }
                            catch (e_4_1) { e_4 = { error: e_4_1 }; }
                            finally {
                                try {
                                    if (middleware_1_1 && !middleware_1_1.done && (_h = middleware_1.return)) _h.call(middleware_1);
                                }
                                finally { if (e_4) throw e_4.error; }
                            }
                        }
                        if (lodash_1.isFunction($__engine.toRoutes)) {
                            try {
                                for (routeController_1 = __values(routeController), routeController_1_1 = routeController_1.next(); !routeController_1_1.done; routeController_1_1 = routeController_1.next()) {
                                    item = routeController_1_1.value;
                                    $__engine.register($__engine.toRoutes(item.routes))(item.path || '/', item.options);
                                }
                            }
                            catch (e_5_1) { e_5 = { error: e_5_1 }; }
                            finally {
                                try {
                                    if (routeController_1_1 && !routeController_1_1.done && (_j = routeController_1.return)) _j.call(routeController_1);
                                }
                                finally { if (e_5) throw e_5.error; }
                            }
                        }
                        if (!ssrPlugins) return [3, 10];
                        _l.label = 2;
                    case 2:
                        _l.trys.push([2, 8, 9, 10]);
                        ssrPlugins_1 = __values(ssrPlugins), ssrPlugins_1_1 = ssrPlugins_1.next();
                        _l.label = 3;
                    case 3:
                        if (!!ssrPlugins_1_1.done) return [3, 7];
                        item = ssrPlugins_1_1.value;
                        handler = item.handler, prescript = item.prescript, prefix = item.prefix;
                        if (!prescript) return [3, 5];
                        return [4, prescript($__engine)];
                    case 4:
                        _l.sent();
                        _l.label = 5;
                    case 5:
                        $__engine.register.apply($__engine, __spread(handler))(prefix);
                        _l.label = 6;
                    case 6:
                        ssrPlugins_1_1 = ssrPlugins_1.next();
                        return [3, 3];
                    case 7: return [3, 10];
                    case 8:
                        e_1_1 = _l.sent();
                        e_1 = { error: e_1_1 };
                        return [3, 10];
                    case 9:
                        try {
                            if (ssrPlugins_1_1 && !ssrPlugins_1_1.done && (_k = ssrPlugins_1.return)) _k.call(ssrPlugins_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7];
                    case 10:
                        if (httpException) {
                            notFound = httpException.notFound, exception = httpException.exception;
                            if (notFound && $__engine.toRequestHandler && lodash_1.isFunction($__engine.toRequestHandler)) {
                                path = $__engine.name === 'express' ? '*' : undefined;
                                $__engine.register($__engine.toRequestHandler(notFound))(path);
                            }
                            if (exception && $__engine.toErrorHandler && lodash_1.isFunction($__engine.toErrorHandler)) {
                                path = $__engine.name === 'koa' ? 'error' : undefined;
                                errorhandler = process.env.NODE_ENV === 'development'
                                    ? $__engine.errorhandler()
                                    : $__engine.toErrorHandler(exception);
                                $__engine.register(errorhandler)(path);
                            }
                        }
                        metadata_1.getMetadataArgsStorage().reset();
                        return [2, this.__engine];
                }
            });
        });
    };
    return ServerFactoryStatic;
}());
function ServerFactory(engine) {
    return new ServerFactoryStatic(engine);
}
exports.ServerFactory = ServerFactory;
