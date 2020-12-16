"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var util_1 = require("util");
var escape_html_1 = __importDefault(require("escape-html"));
var accepts_1 = __importDefault(require("accepts"));
var lodash_1 = require("lodash");
var DOUBLE_SPACE_REGEXP = /\x20{2}/g;
var NEW_LINE_REGEXP = /\n/g;
var TEMPLATE = fs_1.default.readFileSync(path_1.default.join(__dirname, '../public/error.html'), 'utf8');
var defer = typeof setImmediate === 'function'
    ? setImmediate
    : function (fn) { process.nextTick(fn.bind.apply(fn, arguments)); };
var escapeHtmlBlock = function (str) { return escape_html_1.default(str).replace(DOUBLE_SPACE_REGEXP, ' &nbsp;').replace(NEW_LINE_REGEXP, '<br>'); };
function errorhandler(options) {
    var env = process.env.NODE_ENV || 'development';
    var log = (options === null || options === void 0 ? void 0 : options.log) === undefined ? env !== 'test' : options.log;
    if (typeof log !== 'function' && typeof log !== 'boolean') {
        throw new TypeError('option log must be function or boolean');
    }
    if (log === true) {
        log = function (err, str) {
            console.error(str || err.stack);
        };
    }
    return function (err, ctx) {
        ctx.status(err.status || 500);
        var str = stringify(err);
        var accept = accepts_1.default(ctx.req);
        var type = accept.type('html', 'json', 'text');
        defer(log, err, str, ctx);
        if (type === 'html') {
            var isInspect = !err.stack && String(err) === toString.call(err);
            var errorHtml = !isInspect
                ? escapeHtmlBlock(str.split('\n', 1)[0] || 'Error')
                : 'Error';
            var stack = !isInspect
                ? String(str).split('\n').slice(1)
                : [str];
            var stackHtml = stack
                .map(function (v) { return '<li>' + escapeHtmlBlock(v) + '</li>'; })
                .join('');
            var body = TEMPLATE
                .replace('{stack}', stackHtml)
                .replace('{statusCode}', String(ctx.statusCode))
                .replace('{title}', escape_html_1.default('Connect'))
                .replace(/\{error\}/g, errorHtml);
            ctx.setHeader('Content-Type', 'text/html; charset=utf-8');
            ctx.send(body);
        }
        else if (type === 'json') {
            var error = lodash_1.pick(err, __spread(Object.keys(err), ['stack']));
            ctx.setHeader('Content-Type', 'application/json; charset=utf-8');
            ctx.json({ error: error });
        }
        else {
            ctx.setHeader('Content-Type', 'text/plain; charset=utf-8');
            ctx.send(str);
        }
    };
}
exports.default = errorhandler;
function stringify(err) {
    var stack = err.stack;
    if (stack) {
        return String(stack);
    }
    var str = String(err);
    return str === toString.call(err) ? util_1.inspect(err) : str;
}
