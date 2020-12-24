"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var koa_1 = require("@kenote/koa");
var koa_compose_1 = __importDefault(require("koa-compose"));
var koa_generic_session_1 = __importDefault(require("koa-generic-session"));
function koaSession(options) {
    return koa_compose_1.default([
        koa_generic_session_1.default(options),
        function (context, next) {
            koa_1.Context.prototype.session = context.session;
            koa_1.Context.prototype.sessionSave = context.sessionSave;
            koa_1.Context.prototype.regenerateSession = context.regenerateSession;
            return next();
        }
    ]);
}
module.exports = koaSession;
