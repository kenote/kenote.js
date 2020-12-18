"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bind = exports.Middleware = void 0;
var metadata_1 = require("./metadata");
function Middleware(options) {
    return function (target) {
        metadata_1.getMetadataArgsStorage().middlewares.push({
            target: target,
            options: options
        });
    };
}
exports.Middleware = Middleware;
function Bind(name) {
    return function (target, methodName, descriptor) {
        metadata_1.getMetadataArgsStorage().actions.push({
            target: target.constructor,
            handler: descriptor.value,
            name: name || methodName
        });
    };
}
exports.Bind = Bind;
