"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = require("@kenote/express");
var express_session_1 = __importDefault(require("express-session"));
function expressSession(options) {
    return [
        express_session_1.default(options),
        express_1.toRequestHandler(function (ctx, next) {
            express_1.Context.prototype.session = ctx.req.session;
            express_1.Context.prototype.sessionID = ctx.req.sessionID;
            return next();
        })
    ];
}
module.exports = expressSession;
