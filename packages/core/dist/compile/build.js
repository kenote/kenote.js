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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runBuild = void 0;
var path_1 = __importDefault(require("path"));
var runscript_1 = __importDefault(require("runscript"));
var lodash_1 = require("lodash");
var config_1 = require("./config");
function runBuild() {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var options, config, outDir, srcDir, tsconfig, _b, _c, command, e_1_1, error_1;
        var e_1, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    options = config_1.readConfigure('kenci.config');
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 14, , 15]);
                    config = lodash_1.merge(config_1.defaultOptions, (_a = options === null || options === void 0 ? void 0 : options.default) !== null && _a !== void 0 ? _a : options);
                    outDir = path_1.default.resolve(process.cwd(), config.build.outDir);
                    srcDir = path_1.default.resolve(process.cwd(), config.srcDir);
                    tsconfig = path_1.default.resolve(srcDir, config.tsconfig);
                    if (!config.commands) return [3, 9];
                    _e.label = 2;
                case 2:
                    _e.trys.push([2, 7, 8, 9]);
                    _b = __values(config.commands), _c = _b.next();
                    _e.label = 3;
                case 3:
                    if (!!_c.done) return [3, 6];
                    command = _c.value;
                    return [4, runscript_1.default(command)];
                case 4:
                    _e.sent();
                    _e.label = 5;
                case 5:
                    _c = _b.next();
                    return [3, 3];
                case 6: return [3, 9];
                case 7:
                    e_1_1 = _e.sent();
                    e_1 = { error: e_1_1 };
                    return [3, 9];
                case 8:
                    try {
                        if (_c && !_c.done && (_d = _b.return)) _d.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7];
                case 9:
                    if (!config.build.emptyOutDir) return [3, 11];
                    console.log("\u6E05\u7406\u7F16\u8BD1\u76EE\u5F55...");
                    return [4, runscript_1.default("rm -rf " + outDir + "/*")];
                case 10:
                    _e.sent();
                    _e.label = 11;
                case 11:
                    console.log("\u7F16\u8BD1 Ts \u5230 " + outDir + " \u76EE\u5F55...");
                    return [4, runscript_1.default("tsc --project " + tsconfig + " --outDir " + outDir)];
                case 12:
                    _e.sent();
                    console.log("\u8F6C\u6362 tspaths ...");
                    return [4, runscript_1.default("tscpaths -p " + tsconfig + " --src " + srcDir + " --out " + outDir)];
                case 13:
                    _e.sent();
                    console.log("\u7F16\u8BD1\u5B8C\u6210\uFF01");
                    return [3, 15];
                case 14:
                    error_1 = _e.sent();
                    console.error(error_1);
                    return [3, 15];
                case 15:
                    process.exit(0);
                    return [2];
            }
        });
    });
}
exports.runBuild = runBuild;
