"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toResponseResult = exports.getNodeResponse = exports.getNodeEntrance = void 0;
var path_1 = require("path");
var http_errors_1 = __importDefault(require("http-errors"));
var js_yaml_1 = __importDefault(require("js-yaml"));
var rule_judgment_1 = __importDefault(require("rule-judgment"));
var parse_string_1 = require("parse-string");
var config_1 = require("@kenote/config");
var lodash_1 = require("lodash");
var utils_1 = require("./utils");
var api_proxy_1 = require("./api-proxy");
var http_1 = require("./http");
var socket_1 = require("./socket");
function getNodeEntrance(options) {
    var _this = this;
    return function (ctx, pathname) { return __awaiter(_this, void 0, void 0, function () {
        var channel, pathLabel, sandbox, channelPath, allEntrance, entrance, setting, serviceModules, whitelist, isAuth, body, payload;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    channel = options.channel, pathLabel = options.pathLabel, sandbox = options.sandbox;
                    if (!(ctx === null || ctx === void 0 ? void 0 : ctx.channel) || !(ctx === null || ctx === void 0 ? void 0 : ctx.pathLabel)) {
                        throw (0, http_errors_1.default)(500, '缺少频道和路径', { code: 1000 });
                    }
                    channelPath = (0, path_1.resolve)(process.cwd(), pathname, channel);
                    allEntrance = (0, config_1.loadConfig)([pathname, channel, 'wss'].join('/'), { type: 'array' });
                    entrance = allEntrance === null || allEntrance === void 0 ? void 0 : allEntrance.find(function (v) { return v.name === pathLabel; });
                    if (!entrance) {
                        throw (0, http_errors_1.default)(500, '当前访问的接口不存在', { code: 1000 });
                    }
                    setting = (0, config_1.loadConfig)([pathname, channel, 'setting'].join('/'), { mode: 'merge' });
                    return [4, (0, utils_1.getServiceModules)({
                            cwd: (0, path_1.resolve)(channelPath, 'js'),
                            sandbox: sandbox,
                            alias: setting === null || setting === void 0 ? void 0 : setting.jsAlias
                        })];
                case 1:
                    serviceModules = _b.sent();
                    whitelist = (0, lodash_1.uniq)((0, lodash_1.compact)((0, lodash_1.concat)(setting === null || setting === void 0 ? void 0 : setting.whitelist, entrance === null || entrance === void 0 ? void 0 : entrance.whitelist)));
                    if (whitelist.length > 0 && !whitelist.find(function (v) { return new RegExp(v).test(ctx.clientIP); })) {
                        throw (0, http_errors_1.default)(500, '没有访问该页面的权限 [whitelist]', { code: 1000 });
                    }
                    if (entrance.filterAuth) {
                        isAuth = (0, rule_judgment_1.default)(entrance.filterAuth)(ctx.auth);
                        if (!isAuth) {
                            throw (0, http_errors_1.default)(500, '没有访问该页面的权限 [Unauthorized]', { code: 1000 });
                        }
                    }
                    body = (_a = ctx === null || ctx === void 0 ? void 0 : ctx.body) !== null && _a !== void 0 ? _a : {};
                    payload = entrance.payload ? (0, parse_string_1.filterData)(entrance.payload, serviceModules)(body) : body;
                    payload = (0, api_proxy_1.parseProps)(entrance.props)(payload);
                    serviceModules.payload = payload;
                    return [2, { serviceModules: serviceModules, payload: payload, entrance: entrance, setting: setting }];
            }
        });
    }); };
}
exports.getNodeEntrance = getNodeEntrance;
function getNodeResponse(entrance, payload) {
    var _this = this;
    return function (options) { return __awaiter(_this, void 0, void 0, function () {
        var serviceModules, logger, setting, result, type, _a, name_1, args, httpProxy, ret, _b, code, _c, msgtype, requestType, serverTag, tag, tcpSocket, server;
        var _d, _e, _f, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    serviceModules = options.serviceModules, logger = options.logger, setting = options.setting;
                    result = null;
                    type = 'application/octet-stream';
                    if (!(entrance === null || entrance === void 0 ? void 0 : entrance.service)) return [3, 2];
                    _a = entrance.service, name_1 = _a.name, args = _a.args;
                    return [4, (0, utils_1.runService)(name_1, args)(serviceModules)];
                case 1:
                    result = _h.sent();
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
                    return [4, (0, http_1.shellAsCurl)(httpProxy)];
                case 3:
                    ret = _h.sent();
                    _b = __read((_e = (_d = ret.status) === null || _d === void 0 ? void 0 : _d.split(/\s+/)) !== null && _e !== void 0 ? _e : [], 2), code = _b[1];
                    if (code != '200') {
                        throw (0, http_errors_1.default)(500, ['HttpProxy:', (_f = ret.status) === null || _f === void 0 ? void 0 : _f.replace('404 OK', '404 Not Found')].join(''), { code: 1000 });
                    }
                    result = ret.body;
                    type = (0, utils_1.getHeader)('content-type')((_g = ret.headers) !== null && _g !== void 0 ? _g : []);
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
                    }
                    tcpSocket.logger = logger;
                    return [4, (0, socket_1.socketRequest)(msgtype, payload, requestType)({ tcpSocket: tcpSocket, server: server, tag: tag })];
                case 5:
                    result = _h.sent();
                    _h.label = 6;
                case 6:
                    result = (0, utils_1.parsePlainObject)(result, entrance === null || entrance === void 0 ? void 0 : entrance.parse)(serviceModules);
                    return [2, [type, result]];
            }
        });
    }); };
}
exports.getNodeResponse = getNodeResponse;
function toResponseResult(path, data, type) {
    var result = {
        timestamp: Date.now(),
        path: path
    };
    if ((0, lodash_1.isError)(data)) {
        result.error = data.message;
    }
    else if ((0, lodash_1.isBuffer)(data)) {
        result.data = (0, config_1.isJson)(data.toString()) || (0, config_1.isYaml)(data.toString()) ? js_yaml_1.default.load(data) : data.toString();
    }
    else {
        result.data = data;
    }
    return JSON.stringify(result);
}
exports.toResponseResult = toResponseResult;
