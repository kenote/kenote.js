"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var koa_1 = require("@kenote/koa");
var koa_passport_1 = __importDefault(require("koa-passport"));
function koaPassport() {
    koa_passport_1.default.serializeUser(function (user, done) { return done(null, user); });
    koa_passport_1.default.deserializeUser(function (user, done) { return done(null, user); });
    return [
        koa_passport_1.default.initialize(),
        koa_passport_1.default.session(),
        koa_1.toRequestHandler(function (ctx, next) {
            var _a;
            koa_1.Context.prototype.user = (_a = ctx.context.state) === null || _a === void 0 ? void 0 : _a.user;
            koa_1.Context.prototype.login = koa_1.Context.prototype.logIn = ctx.context.login.bind(ctx.context);
            koa_1.Context.prototype.logout = koa_1.Context.prototype.logOut = ctx.context.logout.bind(ctx.context);
            koa_1.Context.prototype.isAuthenticated = ctx.context.isAuthenticated.bind(ctx.req);
            koa_1.Context.prototype.isUnauthenticated = ctx.context.isUnauthenticated.bind(ctx.req);
            return next();
        })
    ];
}
module.exports = koaPassport;
