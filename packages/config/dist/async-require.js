"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncRequire = void 0;
var fs_1 = __importDefault(require("fs"));
var escode_1 = require("./escode");
function asyncRequire(filename, ctx) {
    var file = require.resolve(filename);
    if (!fs_1.default.existsSync(file))
        return undefined;
    var source = fs_1.default.readFileSync(file, 'utf-8');
    return escode_1.readCode(source, ctx);
}
exports.asyncRequire = asyncRequire;
