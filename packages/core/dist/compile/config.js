"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateNodemon = exports.readConfigure = exports.defaultOptions = void 0;
var path_1 = __importDefault(require("path"));
var config_1 = require("@kenote/config");
var fs_1 = __importDefault(require("fs"));
var lodash_1 = require("lodash");
var developDir = path_1.default.resolve(process.cwd(), '.develop');
exports.defaultOptions = {
    entry: 'main.ts',
    srcDir: 'src/',
    tsconfig: 'tsconfig.json',
    build: {
        outDir: 'dist/',
        emptyOutDir: false
    },
    develop: {
        ignore: ['.git/', 'node_modules/', 'dist/', 'coverage/'],
        ext: 'js,ts,json',
        port: 4000
    }
};
function readConfigure(name) {
    try {
        return require(path_1.default.resolve(process.cwd(), name));
    }
    catch (error) {
        return config_1.loadConfig(name + ".yml");
    }
}
exports.readConfigure = readConfigure;
function generateNodemon(config) {
    var _a;
    var srcDir = path_1.default.resolve(process.cwd(), config.srcDir);
    var tsconfig = path_1.default.resolve(srcDir, config.tsconfig);
    var options = {
        restartable: 'rs',
        ignore: config.develop.ignore,
        watch: lodash_1.merge([srcDir], config.develop.watch),
        ext: config.develop.ext,
        execMap: {
            ts: 'node -r ts-node/register -r tsconfig-paths/register'
        },
        env: lodash_1.merge({
            NODE_ENV: 'development',
            SERVER_PORT: (_a = config.develop.port) !== null && _a !== void 0 ? _a : 4000,
            TS_NODE_PROJECT: tsconfig
        }, config.develop.env)
    };
    !fs_1.default.existsSync(developDir) && fs_1.default.mkdirSync(developDir, { recursive: true });
    var nodemonConfigFile = path_1.default.resolve(developDir, 'nodemon.json');
    fs_1.default.writeFileSync(nodemonConfigFile, JSON.stringify(options, null, 2));
    return nodemonConfigFile;
}
exports.generateNodemon = generateNodemon;
