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
exports.loadModules = exports.Module = void 0;
require("reflect-metadata");
var metadata_1 = require("./metadata");
var controller_1 = require("./controller");
var MODULE_METADATA = 'MODULE';
function Module(options) {
    return function (target) {
        Reflect.defineMetadata(MODULE_METADATA, options, target);
    };
}
exports.Module = Module;
function loadModules(module) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var options, imports, imports_1, imports_1_1, item, e_1_1, _b, _c, _d, middlewares, _loop_1, middlewares_1, middlewares_1_1, middleware;
        var e_1, _e, e_2, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    options = Reflect.getMetadata(MODULE_METADATA, module) || {};
                    if (!('imports' in options)) return [3, 9];
                    imports = options.imports;
                    _g.label = 1;
                case 1:
                    _g.trys.push([1, 6, 7, 8]);
                    imports_1 = __values(imports), imports_1_1 = imports_1.next();
                    _g.label = 2;
                case 2:
                    if (!!imports_1_1.done) return [3, 5];
                    item = imports_1_1.value;
                    return [4, loadModules(item)];
                case 3:
                    _g.sent();
                    _g.label = 4;
                case 4:
                    imports_1_1 = imports_1.next();
                    return [3, 2];
                case 5: return [3, 8];
                case 6:
                    e_1_1 = _g.sent();
                    e_1 = { error: e_1_1 };
                    return [3, 8];
                case 7:
                    try {
                        if (imports_1_1 && !imports_1_1.done && (_e = imports_1.return)) _e.call(imports_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7];
                case 8: return [3, 12];
                case 9:
                    if (!('controller' in options)) return [3, 11];
                    _c = (_b = metadata_1.getMetadataArgsStorage().application.routeController).push;
                    _d = {
                        path: options.path
                    };
                    return [4, getRoutes(options)];
                case 10:
                    _c.apply(_b, [(_d.routes = _g.sent(),
                            _d.options = options.options,
                            _d)]);
                    return [3, 12];
                case 11:
                    if ('statics' in options) {
                        metadata_1.getMetadataArgsStorage().application.staticServer = options;
                    }
                    else if ('viewDir' in options) {
                        metadata_1.getMetadataArgsStorage().application.templateOptions = options;
                    }
                    _g.label = 12;
                case 12:
                    if ('plugins' in options) {
                        metadata_1.getMetadataArgsStorage().application.plugins = __spread(options.plugins);
                    }
                    if ('middlewares' in options) {
                        middlewares = metadata_1.getMetadataArgsStorage().middlewares;
                        metadata_1.getMetadataArgsStorage().application.middleware = [];
                        _loop_1 = function (middleware) {
                            var e_3, _a;
                            var actions = metadata_1.getMetadataArgsStorage().actions.filter(function (o) { return o.target === middleware.target; });
                            var methods = [];
                            try {
                                for (var actions_1 = (e_3 = void 0, __values(actions)), actions_1_1 = actions_1.next(); !actions_1_1.done; actions_1_1 = actions_1.next()) {
                                    var action = actions_1_1.value;
                                    methods.push({
                                        name: action.name,
                                        handler: action.handler,
                                        property: action.property
                                    });
                                }
                            }
                            catch (e_3_1) { e_3 = { error: e_3_1 }; }
                            finally {
                                try {
                                    if (actions_1_1 && !actions_1_1.done && (_a = actions_1.return)) _a.call(actions_1);
                                }
                                finally { if (e_3) throw e_3.error; }
                            }
                            (_a = metadata_1.getMetadataArgsStorage().application.middleware) === null || _a === void 0 ? void 0 : _a.push({
                                methods: methods,
                                options: middleware.options
                            });
                        };
                        try {
                            for (middlewares_1 = __values(middlewares), middlewares_1_1 = middlewares_1.next(); !middlewares_1_1.done; middlewares_1_1 = middlewares_1.next()) {
                                middleware = middlewares_1_1.value;
                                _loop_1(middleware);
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (middlewares_1_1 && !middlewares_1_1.done && (_f = middlewares_1.return)) _f.call(middlewares_1);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                    }
                    if ('httpException' in options) {
                        metadata_1.getMetadataArgsStorage().application.httpException = options.httpException;
                    }
                    return [2];
            }
        });
    });
}
exports.loadModules = loadModules;
function getRoutes(options) {
    return __awaiter(this, void 0, void 0, function () {
        var controllers, routes, _loop_2, controllers_1, controllers_1_1, controller, e_4_1;
        var e_4, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    controllers = metadata_1.getMetadataArgsStorage().controllers.filter(function (o) { return options.controller.includes(o.target); });
                    routes = [];
                    _loop_2 = function (controller) {
                        var target, baseRoute, actions, handlers;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    target = controller.target, baseRoute = controller.baseRoute;
                                    actions = metadata_1.getMetadataArgsStorage().actions.filter(function (o) { return o.target === target; });
                                    return [4, getActiions(actions, baseRoute)];
                                case 1:
                                    handlers = _a.sent();
                                    routes = __spread(routes, handlers);
                                    return [2];
                            }
                        });
                    };
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, 7, 8]);
                    controllers_1 = __values(controllers), controllers_1_1 = controllers_1.next();
                    _b.label = 2;
                case 2:
                    if (!!controllers_1_1.done) return [3, 5];
                    controller = controllers_1_1.value;
                    return [5, _loop_2(controller)];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4:
                    controllers_1_1 = controllers_1.next();
                    return [3, 2];
                case 5: return [3, 8];
                case 6:
                    e_4_1 = _b.sent();
                    e_4 = { error: e_4_1 };
                    return [3, 8];
                case 7:
                    try {
                        if (controllers_1_1 && !controllers_1_1.done && (_a = controllers_1.return)) _a.call(controllers_1);
                    }
                    finally { if (e_4) throw e_4.error; }
                    return [7];
                case 8: return [2, routes];
            }
        });
    });
}
function getActiions(actions, baseRoute) {
    return __awaiter(this, void 0, void 0, function () {
        var routes, actions_2, actions_2_1, action, type, route, handler, filters;
        var e_5, _a;
        return __generator(this, function (_b) {
            routes = [];
            try {
                for (actions_2 = __values(actions), actions_2_1 = actions_2.next(); !actions_2_1.done; actions_2_1 = actions_2.next()) {
                    action = actions_2_1.value;
                    type = action.type, route = action.route, handler = action.handler, filters = action.filters;
                    routes.push({
                        method: type,
                        routePath: controller_1.toRoutePath(baseRoute)(route),
                        handler: __spread(filters || [], [handler])
                    });
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (actions_2_1 && !actions_2_1.done && (_a = actions_2.return)) _a.call(actions_2);
                }
                finally { if (e_5) throw e_5.error; }
            }
            return [2, routes];
        });
    });
}
