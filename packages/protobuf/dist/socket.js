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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TCPSocket = void 0;
var net_1 = __importDefault(require("net"));
var protobuf_1 = require("./protobuf");
var ExBuffer_1 = __importDefault(require("./ExBuffer"));
var lodash_1 = require("lodash");
var TCPSocket = (function () {
    function TCPSocket(options) {
        this.__Options = options;
        if (options.protobuf) {
            this.__Protobuf = new protobuf_1.Protobuf(options === null || options === void 0 ? void 0 : options.protobuf);
        }
    }
    TCPSocket.prototype.encode = function (msgtype, params, requestType) {
        if (this.__Protobuf) {
            this.__DataBuffer = this.__Protobuf.encode(msgtype, params, requestType);
        }
        return this;
    };
    TCPSocket.prototype.connect = function (options) {
        var logger = this.__Options.logger;
        var _a = lodash_1.merge(this.__Options, options), host = _a.host, port = _a.port;
        if (this.__Client) {
            this.__Client.destroy();
            this.__Client = null;
            this.__ExBuffer = null;
        }
        var client = new net_1.default.Socket();
        client.connect({ host: host, port: port }, function () {
            logger === null || logger === void 0 ? void 0 : logger.info('连接到', host, port);
        });
        this.__Client = client;
        return this;
    };
    TCPSocket.prototype.send = function (data) {
        var _this = this;
        var _a;
        if (!this.__Client || this.__Client.destroyed) {
            this.connect();
        }
        var client = this.__Client;
        this.__ExBuffer = new ExBuffer_1.default().uint32Head().bigEndian();
        client === null || client === void 0 ? void 0 : client.write((_a = this.__DataBuffer) !== null && _a !== void 0 ? _a : data);
        client === null || client === void 0 ? void 0 : client.on('data', function (buffer) { var _a; return (_a = _this.__ExBuffer) === null || _a === void 0 ? void 0 : _a.put(buffer); });
        if (this.__DataBuffer) {
            this.__DataBuffer = null;
            if (data === true) {
                return this.exec();
            }
        }
        return this;
    };
    TCPSocket.prototype.on = function (event, listener) {
        var _a;
        if (!this.__Client)
            return;
        var client = this.__Client;
        if (event === 'data') {
            (_a = this.__ExBuffer) === null || _a === void 0 ? void 0 : _a.on('data', listener);
        }
        else {
            client.on(event, listener);
        }
    };
    TCPSocket.prototype.once = function (event, listener) {
        var _a;
        if (!this.__Client)
            return;
        var client = this.__Client;
        if (event === 'data') {
            (_a = this.__ExBuffer) === null || _a === void 0 ? void 0 : _a.once('data', listener);
        }
        else {
            client.once(event, listener);
        }
    };
    TCPSocket.prototype.exec = function () {
        return __awaiter(this, void 0, void 0, function () {
            var logger;
            var _this = this;
            return __generator(this, function (_a) {
                logger = this.__Options.logger;
                return [2, new Promise(function (resolve, reject) {
                        _this.on('data', function (buffer) {
                            if (buffer.length > 0) {
                                try {
                                    if (_this.__Protobuf) {
                                        resolve(_this.__Protobuf.decode(buffer));
                                    }
                                    else {
                                        resolve(buffer);
                                    }
                                }
                                catch (error) {
                                    reject(error);
                                }
                                _this.destroy();
                            }
                        });
                        _this.on('error', function (error) { return reject(error); });
                        _this.on('close', function () {
                            logger === null || logger === void 0 ? void 0 : logger.info('Socket is closed.');
                        });
                        _this.on('timeout', function () {
                            logger === null || logger === void 0 ? void 0 : logger.info('Socket is timout.');
                        });
                    })];
            });
        });
    };
    TCPSocket.prototype.destroy = function () {
        var _a;
        (_a = this.__Client) === null || _a === void 0 ? void 0 : _a.destroy();
    };
    return TCPSocket;
}());
exports.TCPSocket = TCPSocket;
