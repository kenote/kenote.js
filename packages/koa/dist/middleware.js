"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toMiddleware = exports.toErrorHandler = exports.toRequestHandler = void 0;
var context_1 = __importDefault(require("./context"));
function toRequestHandler(handler) {
    return function (context, next) {
        var ctx = new context_1.default(context);
        return handler(ctx, nextHandler(next, ctx));
    };
}
exports.toRequestHandler = toRequestHandler;
function toErrorHandler(handler) {
    return function (err, ctx) {
        return handler(err, ctx);
    };
}
exports.toErrorHandler = toErrorHandler;
function toMiddleware(methods, headers) {
    return function (context, next) {
        var e_1, _a, e_2, _b;
        if (headers) {
            try {
                for (var _c = __values(Object.entries(headers)), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var _e = __read(_d.value, 2), name_1 = _e[0], value = _e[1];
                    context.append(name_1, value);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        try {
            for (var methods_1 = __values(methods), methods_1_1 = methods_1.next(); !methods_1_1.done; methods_1_1 = methods_1.next()) {
                var item = methods_1_1.value;
                var name_2 = item.name, handler = item.handler, property = item.property;
                var ctx = new context_1.default(context);
                if (handler) {
                    context_1.default.prototype[name_2] = ctx.context[name_2] = handler(ctx);
                }
                else if (property) {
                    context_1.default.prototype[name_2] = ctx.context[name_2] = property(ctx);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (methods_1_1 && !methods_1_1.done && (_b = methods_1.return)) _b.call(methods_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return next();
    };
}
exports.toMiddleware = toMiddleware;
function nextHandler(next, ctx) {
    return function (error) {
        if (error) {
            ctx.next(error);
        }
        else {
            return next();
        }
    };
}
