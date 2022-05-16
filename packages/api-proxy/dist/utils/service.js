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
exports.getServiceModules = void 0;
var path_1 = __importDefault(require("path"));
var lodash_1 = require("lodash");
var config_1 = require("@kenote/config");
var sandboxBasicContext = {
    module: module,
    require: require,
    console: console,
    process: process
};
function getNpmModule(moduleName) {
    try {
        return require(moduleName);
    }
    catch (error) {
        return null;
    }
}
function getServiceModules(options) {
    return __awaiter(this, void 0, void 0, function () {
        var alias, cwd, sandbox, basicModules, customModules;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    alias = options.alias, cwd = options.cwd, sandbox = options.sandbox;
                    basicModules = getAliasModule(alias !== null && alias !== void 0 ? alias : {}, sandbox);
                    return [4, getCustomModules(cwd, basicModules)];
                case 1:
                    customModules = _a.sent();
                    return [2, (0, lodash_1.merge)(basicModules, customModules)];
            }
        });
    });
}
exports.getServiceModules = getServiceModules;
function getAliasModule(alias, sandbox) {
    var e_1, _a;
    if (sandbox === void 0) { sandbox = {}; }
    var services = sandbox;
    try {
        for (var _b = __values(Object.entries(alias)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 2), key = _d[0], val = _d[1];
            services[key] = getNpmModule(val);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return services;
}
function getCustomModules(cwd, sandboxContext) {
    return __awaiter(this, void 0, void 0, function () {
        var services, files, _a, _b, file;
        var e_2, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    services = {};
                    return [4, (0, config_1.pickFilesPromise)(['.**/**', '**'], { cwd: cwd, nodir: true, realpath: true, ignore: ['!**/*.js'] })];
                case 1:
                    files = _d.sent();
                    try {
                        for (_a = __values(files !== null && files !== void 0 ? files : []), _b = _a.next(); !_b.done; _b = _a.next()) {
                            file = _b.value;
                            services[camelCaseName(file, cwd)] = (0, config_1.asyncRequire)(file, (0, lodash_1.merge)(sandboxBasicContext, sandboxContext));
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    return [2, services];
            }
        });
    });
}
function camelCaseName(file, cwd) {
    if (cwd === void 0) { cwd = process.cwd(); }
    var extname = path_1.default.extname(file);
    var filename = file.replace(new RegExp("^".concat(cwd)), '').replace(new RegExp("\\".concat(extname, "$")), '');
    return (0, lodash_1.camelCase)(filename);
}
