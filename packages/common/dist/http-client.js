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
exports.xhrClient = exports.HttpClient = exports.sendData = void 0;
var query_string_1 = __importDefault(require("query-string"));
var url_parse_1 = __importDefault(require("url-parse"));
var lodash_1 = require("lodash");
function setHeader(options) {
    var _a;
    var headers = (_a = options === null || options === void 0 ? void 0 : options.headers) !== null && _a !== void 0 ? _a : {};
    if (options === null || options === void 0 ? void 0 : options.token) {
        headers.authorization = ['Bearer', options.token].join(' ');
    }
    return headers;
}
function onProgress(next, total) {
    return function (progressEvent) {
        var __total = total !== null && total !== void 0 ? total : progressEvent.total;
        var percentage = Math.round((progressEvent.loaded * 100) / __total);
        if (percentage <= 100) {
            next({
                percentage: percentage,
                total: __total,
                size: progressEvent.loaded
            });
        }
    };
}
function getResponseData(options, next) {
    var _this = this;
    return function (client) { return __awaiter(_this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, client(options)];
                case 1:
                    response = _a.sent();
                    next && next(response);
                    if (!response)
                        return [2, null];
                    if (response.status >= 200 && response.status < 300) {
                        return [2, response.data];
                    }
                    throw new Error(response.statusText);
            }
        });
    }); };
}
function sendData(method, url, data) {
    return function (client, options) {
        var _a;
        var config = __assign({ method: method, url: /^(http?s)/.test(url) ? url : lodash_1.compact([options === null || options === void 0 ? void 0 : options.baseURL, url]).join(''), headers: setHeader(options), timeout: options === null || options === void 0 ? void 0 : options.timeout }, options === null || options === void 0 ? void 0 : options.config);
        if (options === null || options === void 0 ? void 0 : options.download) {
            config.responseType = (_a = options.responseType) !== null && _a !== void 0 ? _a : 'blob';
            config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            config.onDownloadProgress = onProgress(options.download, options.total);
        }
        if (options === null || options === void 0 ? void 0 : options.upload) {
            config.method = 'post';
            config.headers['Content-Type'] = 'multipart/form-data';
            config.onUploadProgress = onProgress(options.upload, options.total);
        }
        if (method.toLocaleLowerCase() === 'get') {
            var _b = url_parse_1.default(url), query = _b.query, origin_1 = _b.origin, pathname = _b.pathname;
            config.params = __assign(__assign({}, query_string_1.default.parse(query)), data);
            config.url = origin_1 + pathname;
        }
        else {
            config.data = data;
        }
        return getResponseData(config, options === null || options === void 0 ? void 0 : options.success)(client);
    };
}
exports.sendData = sendData;
var HttpClient = (function () {
    function HttpClient(client, options) {
        var _this = this;
        this.get = function (url, data) { return sendData('GET', url, data)(_this.__client, _this.__options); };
        this.GET = this.get;
        this.post = function (url, data) { return sendData('POST', url, data)(_this.__client, _this.__options); };
        this.POST = this.post;
        this.put = function (url, data) { return sendData('PUT', url, data)(_this.__client, _this.__options); };
        this.PUT = this.put;
        this.delete = function (url, data) { return sendData('DELETE', url, data)(_this.__client, _this.__options); };
        this.DELETE = this.delete;
        this.download = function (url) { return sendData('GET', url, null)(_this.__client, __assign({ download: function (info) { return null; } }, _this.__options)); };
        this.DOWNLOAD = this.download;
        this.upload = function (url, data) { return sendData('POST', url, data)(_this.__client, __assign({ upload: function (info) { return null; } }, _this.__options)); };
        this.UPLOAD = this.upload;
        this.__client = client;
        this.__options = options !== null && options !== void 0 ? options : {};
    }
    return HttpClient;
}());
exports.HttpClient = HttpClient;
function xhrClient(xhr) {
    return function (config) { return new Promise(function (resolve, reject) {
        var e_1, _a;
        var method = config.method, url = config.url, timeout = config.timeout, data = config.data, params = config.params, onDownloadProgress = config.onDownloadProgress, onUploadProgress = config.onUploadProgress, headers = config.headers, responseType = config.responseType, timeoutErrorMessage = config.timeoutErrorMessage;
        var __url = method.toLocaleLowerCase() === 'get' ? query_string_1.default.stringifyUrl({ url: url !== null && url !== void 0 ? url : '', query: params }) : (url !== null && url !== void 0 ? url : '');
        xhr.open(method !== null && method !== void 0 ? method : 'get', __url, true);
        xhr.timeout = timeout !== null && timeout !== void 0 ? timeout : 0;
        var __data = data;
        if (!lodash_1.get(headers, 'content-type') && ['post', 'put'].includes(method.toLowerCase())) {
            xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
            __data = query_string_1.default.stringify(data);
        }
        if (headers) {
            try {
                for (var _b = __values(Object.entries(headers)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var _d = __read(_c.value, 2), key = _d[0], val = _d[1];
                    xhr.setRequestHeader(key, val);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        xhr.onreadystatechange = function () {
            var _a, _b;
            if (xhr.readyState !== 4)
                return;
            var headers = lodash_1.fromPairs(lodash_1.compact(xhr.getAllResponseHeaders().split(/\r|\n/)).map(function (r) { return r.split(/\:/).map(lodash_1.trim); }));
            var response = {
                data: xhr.response,
                status: xhr.status,
                statusText: xhr.statusText,
                headers: headers
            };
            if (['arraybuffer', 'blob'].includes(responseType !== null && responseType !== void 0 ? responseType : '')) {
                response.data = new Blob([xhr.response], { type: xhr.getResponseHeader('content-type') });
            }
            else if (/^(application\/json)/.test((_a = headers['content-type']) !== null && _a !== void 0 ? _a : '')) {
                response.data = JSON.parse((_b = xhr.response) !== null && _b !== void 0 ? _b : '');
            }
            resolve(response);
        };
        if (onDownloadProgress) {
            xhr.onprogress = onDownloadProgress;
        }
        if (onUploadProgress) {
            xhr.upload.onprogress = onUploadProgress;
        }
        xhr.onerror = function () { return reject('Error'); };
        xhr.ontimeout = function () { return reject(timeoutErrorMessage !== null && timeoutErrorMessage !== void 0 ? timeoutErrorMessage : '网络请求超时！'); };
        xhr.onabort = function () { };
        xhr.send(__data);
    }); };
}
exports.xhrClient = xhrClient;
