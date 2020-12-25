"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var koa_1 = require("@kenote/koa");
var koa_generic_session_1 = __importDefault(require("koa-generic-session"));
function koaSession(options) {
    return [
        koa_generic_session_1.default(options),
        koa_1.toRequestHandler(function (ctx, next) {
            koa_1.Context.prototype.session = ctx.context.session;
            koa_1.Context.prototype.sessionSave = ctx.context.sessionSave;
            koa_1.Context.prototype.regenerateSession = ctx.context.regenerateSession;
            return next();
        })
    ];
}
module.exports = koaSession;
