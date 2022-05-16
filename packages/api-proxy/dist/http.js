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
exports.fetchToShell = exports.shellAsCurl = void 0;
var lodash_1 = require("lodash");
var query_string_1 = __importDefault(require("query-string"));
var runscript_1 = __importDefault(require("runscript"));
function shellAsCurl(request) {
    return __awaiter(this, void 0, void 0, function () {
        var shell, _a, status, headers, result, response;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    shell = fetchToShell(request);
                    return [4, getResponseHeaders(shell)];
                case 1:
                    _a = __read.apply(void 0, [_b.sent(), 2]), status = _a[0], headers = _a[1];
                    return [4, (0, runscript_1.default)("".concat(shell), { stdio: 'pipe' })];
                case 2:
                    result = _b.sent();
                    response = {
                        body: result.stdout,
                        headers: headers,
                        status: status
                    };
                    return [2, response];
            }
        });
    });
}
exports.shellAsCurl = shellAsCurl;
function getResponseHeaders(shell) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var result, _c, tunnel, status, info;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4, (0, runscript_1.default)("".concat(shell, " -I"), { stdio: 'pipe' })];
                case 1:
                    result = _d.sent();
                    _c = __read((0, lodash_1.compact)((_b = (_a = result.stdout) === null || _a === void 0 ? void 0 : _a.toString()) === null || _b === void 0 ? void 0 : _b.split(/\r\n/))), tunnel = _c[0], status = _c[1], info = _c.slice(2);
                    return [2, [status, info.slice(0, info.length - 1)]];
            }
        });
    });
}
function fetchToShell(request) {
    var method = request.method, params = request.params, body = request.body, headers = request.headers;
    var shell = 'curl';
    var Imethod = toMethodShell(method);
    var _a = query_string_1.default.parseUrl(request.url), url = _a.url, query = _a.query;
    var Iurl = query_string_1.default.stringifyUrl({ url: url, query: (0, lodash_1.merge)(query, params) });
    var data = '';
    if (body && (method !== null && method !== void 0 ? method : 'GET').toLowerCase() != 'get') {
        var contentType = Object.keys(headers !== null && headers !== void 0 ? headers : {}).find(function (r) { return r.toLowerCase() === 'content-type'; });
        if ((0, lodash_1.get)(headers, contentType) === 'application/json') {
            data = "-d '".concat(JSON.stringify(body), "'");
        }
        else {
            data = "-d '".concat(query_string_1.default.stringify(body), "'");
        }
    }
    var Iheaders = toHeaderShell(headers);
    return (0, lodash_1.compact)([shell, data, Imethod, Iurl, Iheaders]).join(' ');
}
exports.fetchToShell = fetchToShell;
function toMethodShell(value) {
    var method = value.toUpperCase();
    return method === 'GET' ? '' : "-X ".concat(method);
}
function toHeaderShell(value) {
    var e_1, _a;
    if (!value)
        return '';
    var shell = [];
    try {
        for (var _b = __values(Object.entries(value)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 2), key = _d[0], val = _d[1];
            shell.push("-H \"".concat(key, ": ").concat(val, "\""));
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return shell.join(' ');
}
