"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toRoutePath = exports.Delete = exports.Put = exports.Post = exports.Get = exports.Controller = void 0;
var path_1 = __importDefault(require("path"));
var metadata_1 = require("./metadata");
var lodash_1 = require("lodash");
function Controller(baseRoute) {
    return function (target) {
        metadata_1.getMetadataArgsStorage().controllers.push({
            target: target,
            baseRoute: baseRoute
        });
    };
}
exports.Controller = Controller;
var createMethodDecorator = function (type) { return function (route, options) {
    return function (target, methodName, descriptor) {
        var _a = options || {}, filters = _a.filters, headers = _a.headers;
        metadata_1.getMetadataArgsStorage().actions.push({
            type: type,
            route: route,
            target: target.constructor,
            filters: filters || [],
            handler: descriptor.value
        });
    };
}; };
exports.Get = createMethodDecorator('GET');
exports.Post = createMethodDecorator('POST');
exports.Put = createMethodDecorator('PUT');
exports.Delete = createMethodDecorator('DELETE');
function toRoutePath(baseRoute) {
    return function (route) {
        if (lodash_1.isArray(route)) {
            return route.map(function (r) { return toRoutePath(baseRoute)(r); });
        }
        var routePath = path_1.default.join(baseRoute || '', route).replace(/\/$/, '');
        return /^\//.test(routePath) ? routePath : "/" + routePath;
    };
}
exports.toRoutePath = toRoutePath;
