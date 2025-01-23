"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseProps = exports.getEntrance = exports.getProxyResponse = void 0;
var config_1 = require("@kenote/config");
var rule_judgment_1 = __importDefault(require("rule-judgment"));
var lodash_1 = require("lodash");
var http_errors_1 = __importDefault(require("http-errors"));
var parse_string_1 = require("parse-string");
var http_1 = require("./http");
var socket_1 = require("./socket");
var utils_1 = require("./utils");
var js_yaml_1 = __importDefault(require("js-yaml"));
var path_1 = __importDefault(require("path"));
function getProxyResponse(entrance, payload) {
    var _this = this;
    return function (options) { return __awaiter(_this, void 0, void 0, function () {
        var setting, serviceModules, logger, ctx, result, type, _a, name_1, args, httpProxy, ret, _b, code, _c, msgtype, requestType, serverTag, tag, tcpSocket, server;
        var _d, _e, _f, _g, _h;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    setting = options.setting, serviceModules = options.serviceModules, logger = options.logger, ctx = options.ctx;
                    result = null;
                    type = 'application/octet-stream';
                    if (!(entrance === null || entrance === void 0 ? void 0 : entrance.service)) return [3, 2];
                    _a = entrance.service, name_1 = _a.name, args = _a.args;
                    ctx.payload = payload;
                    return [4, (0, utils_1.runService)(name_1, args)(serviceModules, ctx)];
                case 1:
                    result = _j.sent();
                    return [3, 6];
                case 2:
                    if (!(entrance === null || entrance === void 0 ? void 0 : entrance.httpProxy)) return [3, 4];
                    httpProxy = entrance.httpProxy;
                    if (httpProxy.method.toUpperCase() === 'GET') {
                        httpProxy.params = (0, lodash_1.merge)(httpProxy.params, payload);
                    }
                    else {
                        httpProxy.body = (0, lodash_1.merge)(httpProxy.body, payload);
                    }
                    if (payload.__TAG) {
                        httpProxy.url = "".concat(httpProxy.url, "/").concat(payload.__TAG);
                    }
                    return [4, (0, http_1.shellAsCurl)(httpProxy)];
                case 3:
                    ret = _j.sent();
                    _b = __read((_e = (_d = ret.status) === null || _d === void 0 ? void 0 : _d.split(/\s+/)) !== null && _e !== void 0 ? _e : [], 2), code = _b[1];
                    if (code != '200') {
                        throw (0, http_errors_1.default)(500, ['HttpProxy:', (_f = ret.status) === null || _f === void 0 ? void 0 : _f.replace('404 OK', '404 Not Found')].join(''), { code: 1000 });
                    }
                    result = ret.body;
                    type = (0, utils_1.getHeader)('content-type')((_g = ret.headers) !== null && _g !== void 0 ? _g : []);
                    if ((0, config_1.isJson)(result.toString())) {
                        result = JSON.stringify(JSON.parse(result.toString()), null, 2);
                    }
                    if ((0, config_1.isYaml)(result.toString()) && entrance.native === 'json') {
                        result = JSON.stringify(js_yaml_1.default.load(result.toString()), null, 2);
                    }
                    return [3, 6];
                case 4:
                    if (!(entrance === null || entrance === void 0 ? void 0 : entrance.socketProxy)) return [3, 6];
                    _c = entrance.socketProxy, msgtype = _c.msgtype, requestType = _c.requestType, serverTag = _c.serverTag;
                    tag = void 0;
                    tcpSocket = { port: 8080 };
                    server = [];
                    if ((0, lodash_1.isPlainObject)(serverTag)) {
                        tcpSocket = serverTag;
                    }
                    else if ((0, lodash_1.isString)(serverTag)) {
                        tag = serverTag;
                    }
                    if (setting) {
                        tcpSocket = (0, lodash_1.merge)(tcpSocket, setting === null || setting === void 0 ? void 0 : setting.tcpSocket);
                        server = (_h = setting.server) !== null && _h !== void 0 ? _h : [];
                    }
                    tcpSocket.logger = logger;
                    return [4, (0, socket_1.socketRequest)(msgtype, payload, requestType)({ tcpSocket: tcpSocket, server: server, tag: tag })];
                case 5:
                    result = _j.sent();
                    _j.label = 6;
                case 6:
                    result = (0, utils_1.parsePlainObject)(result, entrance === null || entrance === void 0 ? void 0 : entrance.parse)((0, lodash_1.get)(serviceModules, 'service.customize'));
                    if (entrance === null || entrance === void 0 ? void 0 : entrance.native) {
                        if ((0, lodash_1.isPlainObject)(result)) {
                            result = JSON.stringify(result, null, 2);
                        }
                        if ((0, lodash_1.isString)(result)) {
                            result = Buffer.from(result);
                        }
                    }
                    if ((0, lodash_1.isString)(result)) {
                        result = js_yaml_1.default.load(result);
                    }
                    return [2, [type, result]];
            }
        });
    }); };
}
exports.getProxyResponse = getProxyResponse;
function getEntrance(options) {
    var _this = this;
    return function (ctx, pathname) { return __awaiter(_this, void 0, void 0, function () {
        var channel, pathLabel, getUser, sandbox, channelPath, allEntrance, method, body, entrance, setting, serviceModules, whitelist, _a, authenticationState, isUser, payload, __TAG, sign, tokenOpts, valid, valid;
        var _b, _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    channel = options.channel, pathLabel = options.pathLabel, getUser = options.getUser, sandbox = options.sandbox;
                    channelPath = path_1.default.resolve(process.cwd(), pathname, channel);
                    allEntrance = (0, config_1.loadConfig)([pathname, channel, 'api'].join('/'), { type: 'array' });
                    method = ctx.method;
                    body = method === 'GET' ? ctx.query : ctx.body;
                    entrance = allEntrance === null || allEntrance === void 0 ? void 0 : allEntrance.find(function (v) { return v.router.find((0, rule_judgment_1.default)({ method: method, path: pathLabel })); });
                    if (!entrance)
                        return [2, { notFound: true }];
                    setting = (0, config_1.loadConfig)([pathname, channel, 'setting'].join('/'), { mode: 'merge' });
                    return [4, (0, utils_1.getServiceModules)({
                            cwd: path_1.default.resolve(channelPath, 'js'),
                            sandbox: sandbox,
                            alias: setting === null || setting === void 0 ? void 0 : setting.jsAlias
                        })];
                case 1:
                    serviceModules = _f.sent();
                    whitelist = (0, lodash_1.uniq)((0, lodash_1.compact)((0, lodash_1.concat)(setting === null || setting === void 0 ? void 0 : setting.whitelist, entrance === null || entrance === void 0 ? void 0 : entrance.whitelist)));
                    if (whitelist.length > 0 && !whitelist.find(function (v) { return new RegExp(v).test(clientIP(ctx)); })) {
                        throw (0, http_errors_1.default)(500, '没有访问该页面的权限', { code: 1000 });
                    }
                    return [4, useAuthentication(entrance, getUser)];
                case 2:
                    _a = _f.sent(), authenticationState = _a.authenticationState, isUser = _a.isUser;
                    payload = entrance.payload ? (0, parse_string_1.filterData)(entrance.payload, serviceModules)(body) : body;
                    __TAG = (0, lodash_1.get)(ctx.params, 'tag');
                    if (__TAG) {
                        (0, lodash_1.set)(payload, '__TAG', __TAG);
                    }
                    if ((authenticationState === null || authenticationState === void 0 ? void 0 : authenticationState.type) === 'sign' && !((_b = authenticationState.sign) === null || _b === void 0 ? void 0 : _b.debug)) {
                        sign = authenticationState.sign;
                        if ((0, lodash_1.isArray)(sign === null || sign === void 0 ? void 0 : sign.token)) {
                            tokenOpts = __TAG ? sign === null || sign === void 0 ? void 0 : sign.token.find((0, rule_judgment_1.default)({ tags: { $_in: __TAG } })) : (0, lodash_1.get)(sign === null || sign === void 0 ? void 0 : sign.token, 0);
                            valid = tokenOpts && (0, parse_string_1.validSign)(sign === null || sign === void 0 ? void 0 : sign.md5, sign === null || sign === void 0 ? void 0 : sign.field)((0, lodash_1.merge)(payload, { key: tokenOpts === null || tokenOpts === void 0 ? void 0 : tokenOpts.key }));
                            if (!valid) {
                                throw (0, http_errors_1.default)(500, 'MD5验签失败', { code: 1000 });
                            }
                        }
                        else {
                            valid = (0, parse_string_1.validSign)(sign === null || sign === void 0 ? void 0 : sign.md5, sign === null || sign === void 0 ? void 0 : sign.field)((0, lodash_1.merge)(payload, { key: sign === null || sign === void 0 ? void 0 : sign.token }));
                            if (!valid) {
                                throw (0, http_errors_1.default)(500, 'MD5验签失败', { code: 1000 });
                            }
                        }
                    }
                    if ((authenticationState === null || authenticationState === void 0 ? void 0 : authenticationState.type) === 'jwt') {
                        if (isUser === false) {
                            throw (0, http_errors_1.default)(500, '没有访问该页面的权限', { code: 1000 });
                        }
                    }
                    payload = (0, lodash_1.omit)(parseProps(entrance.props)(payload), (authenticationState === null || authenticationState === void 0 ? void 0 : authenticationState.type) === 'sign'
                        ? [(_d = (_c = authenticationState === null || authenticationState === void 0 ? void 0 : authenticationState.sign) === null || _c === void 0 ? void 0 : _c.field) !== null && _d !== void 0 ? _d : 'sign']
                        : []);
                    serviceModules.payload = payload;
                    if (entrance.httpProxy) {
                        entrance.native = (_e = entrance.native) !== null && _e !== void 0 ? _e : true;
                    }
                    return [2, { isUser: isUser, payload: payload, entrance: entrance, setting: setting, authenticationState: authenticationState, channelPath: channelPath, serviceModules: serviceModules }];
            }
        });
    }); };
}
exports.getEntrance = getEntrance;
function useAuthentication(entrance, getUser) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function () {
        var authenticationState, isUser, _e, _f, authentication, user, e_1_1;
        var e_1, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    authenticationState = null;
                    isUser = false;
                    if (!entrance.authentication) return [3, 9];
                    _h.label = 1;
                case 1:
                    _h.trys.push([1, 7, 8, 9]);
                    _e = __values(entrance.authentication), _f = _e.next();
                    _h.label = 2;
                case 2:
                    if (!!_f.done) return [3, 6];
                    authentication = _f.value;
                    authenticationState = authentication;
                    if (!(authentication.type === 'jwt')) return [3, 4];
                    return [4, getUser()];
                case 3:
                    user = _h.sent();
                    if (user) {
                        isUser = (0, rule_judgment_1.default)(__assign({}, authentication.jwt))(user);
                        if (isUser)
                            return [3, 6];
                    }
                    else {
                        isUser = 'Unauthorized';
                    }
                    _h.label = 4;
                case 4:
                    if (authentication.type === 'sign') {
                        (_a = entrance.payload) === null || _a === void 0 ? void 0 : _a.push({
                            key: (_c = (_b = authentication.sign) === null || _b === void 0 ? void 0 : _b.field) !== null && _c !== void 0 ? _c : 'sign',
                            type: 'string',
                            rules: ((_d = authentication.sign) === null || _d === void 0 ? void 0 : _d.debug) ? undefined : [
                                { required: true, message: '缺少验签', code: 1000 }
                            ],
                        });
                    }
                    _h.label = 5;
                case 5:
                    _f = _e.next();
                    return [3, 2];
                case 6: return [3, 9];
                case 7:
                    e_1_1 = _h.sent();
                    e_1 = { error: e_1_1 };
                    return [3, 9];
                case 8:
                    try {
                        if (_f && !_f.done && (_g = _e.return)) _g.call(_e);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7];
                case 9: return [2, { authenticationState: authenticationState, isUser: isUser }];
            }
        });
    });
}
function parseProps(props) {
    return function (data, tag) {
        var e_2, _a, _b;
        if (tag === void 0) { tag = 'payload'; }
        if (!props)
            return data;
        var result = data;
        var keys = [];
        try {
            for (var _c = __values(Object.entries(props)), _d = _c.next(); !_d.done; _d = _c.next()) {
                var _e = __read(_d.value, 2), key = _e[0], val = _e[1];
                var value = (0, lodash_1.get)((_b = {}, _b[tag] = data, _b), val);
                if (value !== undefined)
                    result[key] = value;
                if (key !== val)
                    keys.push(val);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return (0, lodash_1.pick)(result, Object.keys(props));
    };
}
exports.parseProps = parseProps;
function clientIP(ctx) {
    var _a, _b, _c, _d;
    return (_d = (_c = (_b = (_a = (0, lodash_1.get)(ctx.headers, 'x-forwarded-for')) !== null && _a !== void 0 ? _a : (0, lodash_1.get)(ctx.headers, 'x-real-ip')) !== null && _b !== void 0 ? _b : ctx.connection.remoteAddress) !== null && _c !== void 0 ? _c : ctx.req.socket.remoteAddress) !== null && _d !== void 0 ? _d : ctx.ip;
}
