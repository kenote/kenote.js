"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = require("@kenote/express");
var passport_1 = __importDefault(require("passport"));
function expressPassport() {
    passport_1.default.serializeUser(function (user, done) { return done(null, user); });
    passport_1.default.deserializeUser(function (user, done) { return done(null, user); });
    return [
        passport_1.default.initialize(),
        passport_1.default.session(),
        express_1.toRequestHandler(function (ctx, next) {
            express_1.Context.prototype.authInfo = ctx.req.authInfo;
            express_1.Context.prototype.user = ctx.req.user;
            express_1.Context.prototype.login = express_1.Context.prototype.logIn = function (user, options) {
                return new Promise(function (resolve, reject) {
                    ctx.req.login.call(ctx.req, user, options, function (err) {
                        if (err)
                            reject(err);
                        else
                            resolve();
                    });
                });
            };
            express_1.Context.prototype.logout = express_1.Context.prototype.logOut = ctx.req.logout.bind(ctx.req);
            express_1.Context.prototype.isAuthenticated = ctx.req.isAuthenticated.bind(ctx.req);
            express_1.Context.prototype.isUnauthenticated = ctx.req.isUnauthenticated.bind(ctx.req);
            return next();
        }),
    ];
}
module.exports = expressPassport;
