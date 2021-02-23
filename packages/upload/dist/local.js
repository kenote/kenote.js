"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putStream = void 0;
var path_1 = __importDefault(require("path"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var lodash_1 = require("lodash");
function putStream(stream, options, done) {
    var name = options.name, urlprefix = options.urlprefix, root_dir = options.root_dir;
    var filePath = path_1.default.resolve(process.cwd(), root_dir !== null && root_dir !== void 0 ? root_dir : '', name);
    var fileDir = path_1.default.dirname(filePath);
    var filename = lodash_1.last(name.split('/'));
    var dirname = path_1.default.dirname(lodash_1.compact(name.split('/')).join('/'));
    var dir = !/^(\.|\/)$/.test(dirname) ? '?dir=' + dirname : '';
    if (process.env.NODE_ENV !== 'test') {
        !fs_extra_1.default.existsSync(fileDir) && fs_extra_1.default.mkdirpSync(fileDir);
        stream.pipe(fs_extra_1.default.createWriteStream(filePath));
    }
    stream.on('end', function () { return done(null, {
        name: name,
        url: urlprefix + '/' + filename + dir,
        size: 0
    }); });
}
exports.putStream = putStream;
