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
exports.unzip = exports.zip = exports.defaultZipOptions = void 0;
var archiver_1 = __importDefault(require("archiver"));
var unzipper_1 = __importDefault(require("unzipper"));
var lodash_1 = require("lodash");
var fs_1 = __importDefault(require("fs"));
var is_stream_1 = __importDefault(require("is-stream"));
exports.defaultZipOptions = {
    format: 'tar',
    level: 9,
    append: []
};
function zip(file, patterns, globOptions, zipOptions) {
    var _a = lodash_1.merge(exports.defaultZipOptions, zipOptions), format = _a.format, level = _a.level, append = _a.append, ondata = _a.ondata;
    var options = format === 'zip' ? {
        zlib: { level: level }
    } : {
        gzip: true,
        gzipOptions: { level: level }
    };
    return new Promise(function (resolve, reject) {
        var e_1, _a, e_2, _b;
        var archive = archiver_1.default(format, options);
        var output = fs_1.default.createWriteStream(file);
        output.on('close', function () {
            console.log(archive.pointer() + ' total bytes');
            console.log('archiver has been finalized and the output file descriptor has closed.');
        });
        output.on('end', function () {
            console.log('Data has been drained');
        });
        archive.on('warning', function (err) {
            if (err.code === 'ENOENT') {
                console.warn(err.message);
            }
            else {
                reject(err);
            }
        });
        archive.on('error', function (err) {
            reject(err);
        });
        archive.on('data', function (data) { return ondata; });
        archive.on('end', function () {
            var archiveSize = archive.pointer();
            resolve(archiveSize);
        });
        archive.pipe(output);
        try {
            for (var patterns_1 = __values(patterns), patterns_1_1 = patterns_1.next(); !patterns_1_1.done; patterns_1_1 = patterns_1.next()) {
                var pattern = patterns_1_1.value;
                archive.glob(pattern, globOptions);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (patterns_1_1 && !patterns_1_1.done && (_a = patterns_1.return)) _a.call(patterns_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        try {
            for (var _c = __values(append !== null && append !== void 0 ? append : []), _d = _c.next(); !_d.done; _d = _c.next()) {
                var item = _d.value;
                var _e = __read(item, 2), source = _e[0], target = _e[1];
                archive.directory(source, target);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
            }
            finally { if (e_2) throw e_2.error; }
        }
        archive.finalize();
    });
}
exports.zip = zip;
function unzip(zipfile, rootDir, options) {
    return __awaiter(this, void 0, void 0, function () {
        var stream;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (is_stream_1.default(zipfile)) {
                        stream = zipfile;
                    }
                    else {
                        stream = fs_1.default.createReadStream(zipfile);
                    }
                    return [4, stream.pipe(unzipper_1.default.Extract({ path: rootDir }))
                            .on('data', function (chunk) { return options === null || options === void 0 ? void 0 : options.ondata; })
                            .promise()];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    });
}
exports.unzip = unzip;
