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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pickFilsCallback = exports.pickFilesPromise = exports.dataFileSort = exports.loadConfig = exports.isYaml = exports.isJson = void 0;
var js_yaml_1 = __importDefault(require("js-yaml"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var validator_1 = __importDefault(require("validator"));
var lodash_1 = require("lodash");
var glob_1 = __importDefault(require("glob"));
var async_1 = __importDefault(require("async"));
var util_1 = require("util");
var async_require_1 = require("./async-require");
exports.isJson = validator_1.default.isJSON;
function isYaml(str) {
    if (exports.isJson(str))
        return false;
    try {
        return !!js_yaml_1.default.load(str);
    }
    catch (error) {
        return false;
    }
}
exports.isYaml = isYaml;
function loadDataFile(filename, options) {
    var _a;
    if (options === void 0) { options = {}; }
    var filePath = path_1.default.resolve((_a = options.root) !== null && _a !== void 0 ? _a : process.cwd(), filename);
    var __data;
    if (!fs_1.default.existsSync(filePath))
        return __data;
    var extname = path_1.default.extname(filePath);
    if (!/^\.(js|json|yaml|yml)$/.test(extname))
        return __data;
    var fileStr = fs_1.default.readFileSync(filePath, 'utf-8');
    if (/^\.(js)$/.test(extname)) {
        return async_require_1.asyncRequire(filePath, { module: module, require: require, process: process, env: options.assign });
    }
    if (options.assign) {
        fileStr = lodash_1.template(fileStr, { interpolate: /{{([\s\S]+?)}}/g })(options.assign);
    }
    if (isYaml(fileStr)) {
        __data = js_yaml_1.default.load(fileStr);
    }
    else if (exports.isJson(fileStr)) {
        __data = JSON.parse(fileStr);
    }
    return __data;
}
function loadConfig(name, options) {
    var e_1, _a, _b;
    var _c;
    if (options === void 0) { options = {}; }
    var filePath = path_1.default.resolve((_c = options.root) !== null && _c !== void 0 ? _c : process.cwd(), name);
    var __data;
    if (!fs_1.default.existsSync(filePath))
        return __data;
    var fileStat = fs_1.default.statSync(filePath);
    if (fileStat.isFile())
        return loadDataFile(filePath, options);
    if (fileStat.isDirectory()) {
        var files = fs_1.default.readdirSync(filePath);
        if (options.filter) {
            files = files.filter(options.filter);
        }
        __data = options.type === 'array' ? [] : {};
        try {
            for (var _d = __values(dataFileSort(files)), _e = _d.next(); !_e.done; _e = _d.next()) {
                var item = _e.value;
                var itemPath = path_1.default.resolve(filePath, item);
                var itemStat = fs_1.default.statSync(itemPath);
                if (/\.(js|json|yaml|yml)$/.test(item) || itemStat.isDirectory()) {
                    var type = itemStat.isDirectory() ? 'array' : 'object';
                    var itemdata = loadConfig(itemPath, __assign(__assign({}, options), { type: type }));
                    if (lodash_1.isArray(__data)) {
                        __data.push(itemdata);
                    }
                    else {
                        itemdata = lodash_1.isArray(itemdata) ? (_b = {}, _b[item] = itemdata, _b) : itemdata;
                        var mergeFunc = options.mode === 'merge' ? lodash_1.merge : lodash_1.assign;
                        __data = mergeFunc(__data, itemdata);
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    return __data;
}
exports.loadConfig = loadConfig;
function dataFileSort(files) {
    var regex = /^(\S+)\.(default)\.(json|yaml|yml)$/;
    files = files.sort(function (a, b) { return a.replace(regex, '0$1.$3') > b.replace(regex, '0$1.$3') ? 1 : -1; });
    var regex_release = /^(\S+)\.(release)\.(json|yaml|yml)$/;
    var absolute_release = /^(release)\.(json|yaml|yml)$/;
    return __spread(files.filter(function (name) { return !regex_release.test(name); }), files.filter(function (name) { return regex_release.test(name) && !absolute_release.test(name); }), files.filter(function (name) { return absolute_release.test(name); }));
}
exports.dataFileSort = dataFileSort;
exports.pickFilesPromise = util_1.promisify(pickFilsCallback);
function pickFilsCallback(patterns, options, done) {
    async_1.default.map(patterns, function (pattern, done) { return glob_1.default(pattern, options, done); }, function (err, results) {
        if (err) {
            done(err);
        }
        else {
            var files = results === null || results === void 0 ? void 0 : results.reduce(function (files, item) { return files === null || files === void 0 ? void 0 : files.concat(item); });
            done(null, files);
        }
    });
}
exports.pickFilsCallback = pickFilsCallback;
