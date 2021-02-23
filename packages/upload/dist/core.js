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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadStore = exports.UploadStore = void 0;
var path_1 = __importDefault(require("path"));
var busboy_1 = __importDefault(require("busboy"));
var bytes_1 = __importDefault(require("bytes"));
var crypto_1 = __importDefault(require("crypto"));
var UploadStore = (function () {
    function UploadStore(options, req) {
        this.__Options = options;
        this.__Request = req;
    }
    UploadStore.prototype.upload = function (putStream, errInfo, dir) {
        var _this = this;
        if (dir === void 0) { dir = ''; }
        return new Promise(function (resolve, reject) {
            _this.__upload(putStream, dir, function (err, doc) {
                if (err) {
                    reject(errInfo(err, doc));
                }
                else {
                    resolve(doc);
                }
            });
        });
    };
    UploadStore.prototype.__upload = function (putStream, dir, done) {
        if (dir === void 0) { dir = ''; }
        var _a = this.__Options, max_limit = _a.max_limit, mime_types = _a.mime_types, urlprefix = _a.urlprefix, root_dir = _a.root_dir, original_name = _a.original_name, errors = _a.errors;
        var headers = this.__Request.headers;
        var busboy = new busboy_1.default({
            headers: headers,
            limits: {
                fileSize: bytes_1.default(max_limit)
            }
        });
        var files = [];
        busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
            var _a;
            if (!original_name) {
                var extname = path_1.default.extname(filename);
                filename = crypto_1.default.createHash('md5').update(Date.now().toString()).digest('hex') + extname;
            }
            var name = path_1.default.join(dir.replace(/^\//, ''), filename);
            if (mime_types && !(mime_types === null || mime_types === void 0 ? void 0 : mime_types.includes(mimetype))) {
                return done((_a = errors === null || errors === void 0 ? void 0 : errors.mimetype) !== null && _a !== void 0 ? _a : 302, [mimetype]);
            }
            var fileSize = 0;
            file.on('data', function (data) {
                fileSize += data.length;
            });
            file.on('limit', function () {
                var _a;
                return done((_a = errors === null || errors === void 0 ? void 0 : errors.mimetype) !== null && _a !== void 0 ? _a : 301, [max_limit]);
            });
            putStream(file, { name: name, urlprefix: urlprefix, root_dir: root_dir }, function (err, result) {
                if (err) {
                    return done(err, result);
                }
                else if ('name' in result) {
                    files.push(__assign(__assign({}, result), { size: fileSize }));
                }
            });
        });
        busboy.on('finish', function () { return done(null, files); });
        this.__Request.pipe(busboy);
    };
    return UploadStore;
}());
exports.UploadStore = UploadStore;
exports.uploadStore = function (options, req) { return new UploadStore(options, req); };
