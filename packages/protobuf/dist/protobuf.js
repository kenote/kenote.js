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
exports.makeData = exports.Protobuf = void 0;
var path_1 = __importDefault(require("path"));
var protobufjs_1 = __importDefault(require("protobufjs"));
var fs_1 = __importDefault(require("fs"));
var zlib_1 = __importDefault(require("zlib"));
var python_struct_1 = __importDefault(require("python-struct"));
var lodash_1 = require("lodash");
var http_errors_1 = __importDefault(require("http-errors"));
var json_schema_to_typescript_1 = require("json-schema-to-typescript");
var object_inspect_1 = __importDefault(require("object-inspect"));
var zlibOptions = { windowBits: 15, memLevel: 8 };
var compressData = function (buffer, options) {
    if (options === void 0) { options = zlibOptions; }
    return zlib_1.default.gzipSync(buffer, options);
};
var decompressData = function (buffer, options) {
    if (options === void 0) { options = zlibOptions; }
    return zlib_1.default.unzipSync(buffer, options);
};
var Protobuf = (function () {
    function Protobuf(options) {
        var e_1, _a;
        this.__Options = options;
        var files = fs_1.default.readdirSync(path_1.default.resolve(process.cwd(), this.__Options.path)).filter(function (v) { return /(\.proto)$/.test(v); });
        var INamespaces = [];
        try {
            for (var files_1 = __values(files), files_1_1 = files_1.next(); !files_1_1.done; files_1_1 = files_1.next()) {
                var filename = files_1_1.value;
                if (fs_1.default.statSync(path_1.default.resolve(process.cwd(), this.__Options.path, filename)).isDirectory())
                    continue;
                INamespaces.push(__assign({ filename: filename }, this.toObject(filename)));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (files_1_1 && !files_1_1.done && (_a = files_1.return)) _a.call(files_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.INamespaces = INamespaces;
    }
    Protobuf.prototype.encode = function (msgtype, params, requestType) {
        var e_2, _a;
        var encode = this.__Options.encode;
        var values = {};
        try {
            for (var _b = __values(Object.entries(encode.fields)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), key = _d[0], val = _d[1];
                lodash_1.set(values, key, val);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        lodash_1.set(values, encode.msgtype, msgtype);
        lodash_1.set(values, encode.payload, params);
        var message = this.getMessageType(encode.type);
        var payload = this.getPayload(message, values, requestType !== null && requestType !== void 0 ? requestType : this.__Options.requestType);
        var data = message === null || message === void 0 ? void 0 : message.encode(message.create(payload)).finish();
        return makeData(data, lodash_1.merge(zlibOptions, encode.zlibOptions));
    };
    Protobuf.prototype.decode = function (buffer, decodeOptions) {
        var e_3, _a;
        var decode = lodash_1.merge(this.__Options.decode, decodeOptions);
        var ungzipBuffer = decompressData(buffer, lodash_1.merge(zlibOptions, decode.zlibOptions));
        var data = this.getMessageType(decode === null || decode === void 0 ? void 0 : decode.type).decode(ungzipBuffer);
        try {
            for (var _b = __values(Object.entries(data)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), key = _d[0], val = _d[1];
                if (lodash_1.isBuffer(val) && lodash_1.get(decode, ['fields', key])) {
                    data[key] = this.getMessageType(lodash_1.get(decode, ['fields', key])).decode(val);
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return data;
    };
    Protobuf.prototype.getMessageType = function (name) {
        var _a;
        var _b = __read(name.split('.').reverse(), 1), message = _b[0];
        var filename = (_a = this.getFilename(name, 'message')) !== null && _a !== void 0 ? _a : this.__Options.socket;
        var pb = this.loadSync(filename);
        var namespace = parseNamespace(pb.root.toJSON());
        return pb.root.lookupType(namespace.packageName + "." + message);
    };
    Protobuf.prototype.getEnumType = function (name) {
        var _a;
        var _b = __read(name.split('.').reverse(), 1), enumName = _b[0];
        var filename = (_a = this.getFilename(name, 'enum')) !== null && _a !== void 0 ? _a : this.__Options.socket;
        var pb = this.loadSync(filename);
        var namespace = parseNamespace(pb.root.toJSON());
        return pb.root.lookupEnum(namespace.packageName + "." + enumName);
    };
    Protobuf.prototype.getService = function (name) {
        var _a;
        var _b = __read(name.split('.').reverse(), 1), service = _b[0];
        var filename = (_a = this.getFilename(name, 'service')) !== null && _a !== void 0 ? _a : this.__Options.socket;
        var pb = this.loadSync(filename);
        var namespace = parseNamespace(pb.root.toJSON());
        return pb.root.lookupService(namespace.packageName + "." + service);
    };
    Protobuf.prototype.toObject = function (filename) {
        var pb = this.loadSync(filename !== null && filename !== void 0 ? filename : this.__Options.socket);
        return parseNamespace(pb.root.toJSON());
    };
    Protobuf.prototype.loadSync = function (filename) {
        var _a;
        if (!/(\.proto)$/.test(filename !== null && filename !== void 0 ? filename : '')) {
            throw http_errors_1.default("Please select the correct .proto file.");
        }
        var filePath = path_1.default.resolve(process.cwd(), (_a = this.__Options) === null || _a === void 0 ? void 0 : _a.path, filename);
        if (!fs_1.default.existsSync(filePath)) {
            throw http_errors_1.default("File " + filename + " not found.");
        }
        return protobufjs_1.default.loadSync(filePath);
    };
    Protobuf.prototype.getPayload = function (message, values, requestType) {
        var e_4, _a;
        var _b;
        var payload = {};
        try {
            for (var _c = __values((_b = message === null || message === void 0 ? void 0 : message.fieldsArray) !== null && _b !== void 0 ? _b : []), _d = _c.next(); !_d.done; _d = _c.next()) {
                var item = _d.value;
                if (['int32', 'int64', 'uint32', 'uint64', 'sint32', 'sint64', 'fixed32', 'fixed64', 'sfixed32', 'sfixed64', 'double', 'float'].includes(item.type) && item.required) {
                    payload[item.name] = lodash_1.get(values, item.name, item.repeated ? [] : 0);
                }
                else if (['bool'].includes(item.type) && item.required) {
                    payload[item.name] = lodash_1.get(values, item.name, item.repeated ? [] : false);
                }
                else if (['string'].includes(item.type) && item.required) {
                    payload[item.name] = lodash_1.get(values, item.name, item.repeated ? [] : '');
                }
                else if (['bytes'].includes(item.type)) {
                    var message_1 = this.getMessageType(requestType);
                    payload[item.name] = message_1.encode(message_1.create(__assign({}, lodash_1.get(values, item.name)))).finish();
                }
                else if (/^[A-Z]/.test(item.type)) {
                    var message_2 = this.getMessageType(item.type);
                    payload[item.name] = message_2.create(__assign({}, lodash_1.get(values, item.name)));
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return payload;
    };
    Protobuf.prototype.getFilename = function (name, type) {
        var e_5, _a;
        var _b;
        var types = {
            message: 'messages',
            enum: 'enums',
            service: 'services'
        };
        var typeName = (_b = types[type]) !== null && _b !== void 0 ? _b : 'messages';
        var _c = __read(name.split('.').reverse(), 2), message = _c[0], proto = _c[1];
        var files = this.INamespaces.filter(isProto(proto));
        var filename;
        try {
            for (var files_2 = __values(files), files_2_1 = files_2.next(); !files_2_1.done; files_2_1 = files_2.next()) {
                var item = files_2_1.value;
                if (Object.keys(item[typeName]).includes(message)) {
                    filename = item.filename;
                }
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (files_2_1 && !files_2_1.done && (_a = files_2.return)) _a.call(files_2);
            }
            finally { if (e_5) throw e_5.error; }
        }
        return filename;
    };
    Protobuf.prototype.generateTypes = function (name) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var tsPath, options, _c, _d, protoFile, messages, filename, packageName, enums, services, _e, fileName, _f, proto, dts, _g, _h, _j, title, item, str, e_6_1, _k, _l, _m, title, item, str, _o, _p, _q, title, item, methods, _r, _s, _t, key, method, str, e_7_1;
            var e_7, _u, e_6, _v, e_8, _w, e_9, _x, e_10, _y;
            return __generator(this, function (_z) {
                switch (_z.label) {
                    case 0:
                        tsPath = path_1.default.resolve(process.cwd(), (_b = name !== null && name !== void 0 ? name : (_a = this.__Options.tsOptions) === null || _a === void 0 ? void 0 : _a.output) !== null && _b !== void 0 ? _b : this.__Options.path);
                        options = { bannerComment: '' };
                        _z.label = 1;
                    case 1:
                        _z.trys.push([1, 13, 14, 15]);
                        _c = __values(this.INamespaces), _d = _c.next();
                        _z.label = 2;
                    case 2:
                        if (!!_d.done) return [3, 12];
                        protoFile = _d.value;
                        messages = protoFile.messages, filename = protoFile.filename, packageName = protoFile.packageName, enums = protoFile.enums, services = protoFile.services;
                        _e = __read(filename.split('.'), 1), fileName = _e[0];
                        _f = __read(packageName.split('.').reverse(), 1), proto = _f[0];
                        dts = [];
                        _z.label = 3;
                    case 3:
                        _z.trys.push([3, 8, 9, 10]);
                        _g = (e_6 = void 0, __values(Object.entries(messages))), _h = _g.next();
                        _z.label = 4;
                    case 4:
                        if (!!_h.done) return [3, 7];
                        _j = __read(_h.value, 2), title = _j[0], item = _j[1];
                        return [4, json_schema_to_typescript_1.compile(this.ITypeToSchema(title, item, proto), title, options)];
                    case 5:
                        str = _z.sent();
                        dts.push(str);
                        _z.label = 6;
                    case 6:
                        _h = _g.next();
                        return [3, 4];
                    case 7: return [3, 10];
                    case 8:
                        e_6_1 = _z.sent();
                        e_6 = { error: e_6_1 };
                        return [3, 10];
                    case 9:
                        try {
                            if (_h && !_h.done && (_v = _g.return)) _v.call(_g);
                        }
                        finally { if (e_6) throw e_6.error; }
                        return [7];
                    case 10:
                        try {
                            for (_k = (e_8 = void 0, __values(Object.entries(enums))), _l = _k.next(); !_l.done; _l = _k.next()) {
                                _m = __read(_l.value, 2), title = _m[0], item = _m[1];
                                str = object_inspect_1.default(item.values).replace(/\,/g, ',\n ').replace(/\:/g, ' =').replace(/\{/g, "export enum " + title + " {\n ").replace(/\}/g, "\n}\n");
                                dts.push(str);
                            }
                        }
                        catch (e_8_1) { e_8 = { error: e_8_1 }; }
                        finally {
                            try {
                                if (_l && !_l.done && (_w = _k.return)) _w.call(_k);
                            }
                            finally { if (e_8) throw e_8.error; }
                        }
                        try {
                            for (_o = (e_9 = void 0, __values(Object.entries(services))), _p = _o.next(); !_p.done; _p = _o.next()) {
                                _q = __read(_p.value, 2), title = _q[0], item = _q[1];
                                methods = [];
                                try {
                                    for (_r = (e_10 = void 0, __values(Object.entries(item.methods))), _s = _r.next(); !_s.done; _s = _r.next()) {
                                        _t = __read(_s.value, 2), key = _t[0], method = _t[1];
                                        methods.push("  " + key + " (req: " + method.requestType + "): " + method.responseType);
                                    }
                                }
                                catch (e_10_1) { e_10 = { error: e_10_1 }; }
                                finally {
                                    try {
                                        if (_s && !_s.done && (_y = _r.return)) _y.call(_r);
                                    }
                                    finally { if (e_10) throw e_10.error; }
                                }
                                str = "export interface " + title + " {\n" + methods.join('\n') + "\n}\n";
                                dts.push(str);
                            }
                        }
                        catch (e_9_1) { e_9 = { error: e_9_1 }; }
                        finally {
                            try {
                                if (_p && !_p.done && (_x = _o.return)) _x.call(_o);
                            }
                            finally { if (e_9) throw e_9.error; }
                        }
                        fs_1.default.writeFileSync(path_1.default.resolve(tsPath, fileName + ".d.ts"), dts.join('\n'));
                        _z.label = 11;
                    case 11:
                        _d = _c.next();
                        return [3, 2];
                    case 12: return [3, 15];
                    case 13:
                        e_7_1 = _z.sent();
                        e_7 = { error: e_7_1 };
                        return [3, 15];
                    case 14:
                        try {
                            if (_d && !_d.done && (_u = _c.return)) _u.call(_c);
                        }
                        finally { if (e_7) throw e_7.error; }
                        return [7];
                    case 15: return [2];
                }
            });
        });
    };
    Protobuf.prototype.ITypeToSchema = function (title, messageType, root) {
        var e_11, _a;
        var schema = {
            title: title,
            additionalProperties: false,
            required: []
        };
        try {
            for (var _b = __values(Object.entries(messageType.fields)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), key = _d[0], item = _d[1];
                var propertie = toSchemaType(item.type, item.rule === 'repeated');
                if (propertie.type === 'object') {
                    var _e = __read(item.type.split('.').reverse(), 2), name_1 = _e[0], proto = _e[1];
                    var messageName = (proto !== null && proto !== void 0 ? proto : root) + "." + name_1;
                    var message = this.getMessageType(messageName).toJSON();
                    propertie = this.ITypeToSchema('', message, proto !== null && proto !== void 0 ? proto : root);
                }
                else if (propertie.type === 'array' && lodash_1.get(propertie, ['items', 'type']) === 'object') {
                    var _f = __read(item.type.split('.').reverse(), 2), name_2 = _f[0], proto = _f[1];
                    var messageName = (proto !== null && proto !== void 0 ? proto : root) + "." + name_2;
                    var message = this.getMessageType(messageName).toJSON();
                    propertie.items = this.ITypeToSchema('', message, proto !== null && proto !== void 0 ? proto : root);
                }
                lodash_1.set(schema, ['properties', key], propertie);
                if (item.rule === 'required') {
                    schema.required.push(key);
                }
            }
        }
        catch (e_11_1) { e_11 = { error: e_11_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_11) throw e_11.error; }
        }
        return schema;
    };
    return Protobuf;
}());
exports.Protobuf = Protobuf;
function isProto(name) {
    return function (v) {
        var _a = __read(v.packageName.split('.').reverse(), 1), proto = _a[0];
        return proto === name;
    };
}
function parseNamespace(namespace, name) {
    if (name === void 0) { name = []; }
    var messages = {};
    var enums = {};
    var services = {};
    for (var key in namespace) {
        if (!['nested', 'options'].includes((key))) {
            name.push(key);
        }
        if (!lodash_1.get(namespace, 'options')) {
            return parseNamespace(namespace[key], name);
        }
        else {
            var nested = lodash_1.get(namespace, 'nested');
            for (var k in nested) {
                if (lodash_1.get(nested, [k, 'fields'])) {
                    messages[k] = nested[k];
                }
                else if (lodash_1.get(nested, [k, 'values'])) {
                    enums[k] = nested[k];
                }
                else if (lodash_1.get(nested, [k, 'methods'])) {
                    services[k] = nested[k];
                }
            }
        }
        break;
    }
    return { packageName: name.join('.'), messages: messages, enums: enums, services: services };
}
function toSchemaType(name, repeated) {
    if (repeated === void 0) { repeated = false; }
    var typeName = 'object';
    if (['int32', 'int64', 'uint32', 'uint64', 'sint32', 'sint64', 'fixed32', 'fixed64', 'sfixed32', 'sfixed64'].includes(name)) {
        typeName = 'integer';
    }
    else if (['double', 'float'].includes(name)) {
        typeName = 'number';
    }
    else if (['bool'].includes(name)) {
        typeName = 'boolean';
    }
    else if (['string'].includes(name)) {
        typeName = 'string';
    }
    else if (['bytes'].includes(name)) {
        typeName = 'any';
    }
    if (repeated) {
        return { type: 'array', items: { type: typeName } };
    }
    return { type: typeName };
}
function makeData(buffer, options) {
    var zlibBuffer = compressData(buffer, options);
    var head = python_struct_1.default.pack('!i', zlibBuffer.length);
    return Buffer.concat([head, zlibBuffer]);
}
exports.makeData = makeData;
