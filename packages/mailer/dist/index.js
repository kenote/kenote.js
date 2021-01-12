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
exports.mailer = exports.Mailer = void 0;
var nodemailer_1 = __importDefault(require("nodemailer"));
var smtp_transport_1 = __importDefault(require("nodemailer/lib/smtp-transport"));
var async_1 = __importDefault(require("async"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var lodash_1 = require("lodash");
var mjml_1 = __importDefault(require("mjml"));
var html_to_text_1 = require("html-to-text");
var Mailer = (function () {
    function Mailer(options) {
        var _a, _b, _c;
        this.__AsyncRetryOptions = { times: 5, interval: 200 };
        var transport = new smtp_transport_1.default(options.smtpOptions);
        this.__Transport = nodemailer_1.default.createTransport(transport);
        this.__AsyncRetryOptions = (_a = options.asyncRetryOptions) !== null && _a !== void 0 ? _a : { times: 5, interval: 200 };
        this.__mailDir = (_b = options.mailDir) !== null && _b !== void 0 ? _b : path_1.default.resolve(process.cwd(), 'mails');
        this.__RenderString = (_c = options.renderString) !== null && _c !== void 0 ? _c : (function (src, context) { return lodash_1.template(src)(context); });
    }
    Mailer.prototype.asyncSend = function (mail, done) {
        var _this = this;
        async_1.default.retry(this.__AsyncRetryOptions, function () { return __awaiter(_this, void 0, void 0, function () {
            var sentMessageInfo, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.__Transport.sendMail(mail)];
                    case 1:
                        sentMessageInfo = _a.sent();
                        done && done(null, sentMessageInfo);
                        return [3, 3];
                    case 2:
                        error_1 = _a.sent();
                        done && done(error_1, 'Send Mail Error');
                        return [3, 3];
                    case 3: return [2];
                }
            });
        }); }, function (err) {
            if (err) {
                return done && done(err, 'Send Mail Finally Error');
            }
            done && done(null, mail);
            return;
        });
    };
    Mailer.prototype.renderMail = function (filename, context) {
        var extname = path_1.default.extname(filename);
        var tplString = '';
        var mjmlFile = path_1.default.resolve(this.__mailDir, filename);
        if (!fs_1.default.existsSync(mjmlFile) || !/\.(mjml|htm|html|)$/.test(extname))
            return tplString;
        var mjmlString = fs_1.default.readFileSync(mjmlFile, 'utf-8');
        tplString = mjmlString;
        if (/\.(mjml)$/.test(extname)) {
            var mjmlParseResults = mjml_1.default(mjmlString, {});
            tplString = mjmlParseResults.html;
            if (mjmlParseResults.errors.length > 0) {
                console.log(mjmlParseResults.errors);
            }
        }
        if (context) {
            tplString = this.__RenderString(tplString, context);
        }
        return tplString;
    };
    Mailer.prototype.sendMail = function (filename, context) {
        var _this = this;
        var html = this.renderMail(filename, context);
        return function (mail, done) {
            mail.html = html;
            mail.text = html_to_text_1.htmlToText(html);
            _this.asyncSend(mail, done);
        };
    };
    return Mailer;
}());
exports.Mailer = Mailer;
exports.mailer = function (options) { return new Mailer(options); };
