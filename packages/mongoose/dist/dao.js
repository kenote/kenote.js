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
Object.defineProperty(exports, "__esModule", { value: true });
exports.modelDao = exports.ModelDao = void 0;
var lodash_1 = require("lodash");
var bluebird_1 = require("bluebird");
var ModelDao = (function () {
    function ModelDao(model, options) {
        this.__Options = {
            populate: { path: '' },
            limit: 10
        };
        this.__Model = model;
        this.__Options = __assign(__assign({}, this.__Options), options);
    }
    Object.defineProperty(ModelDao.prototype, "name", {
        get: function () {
            var _a;
            return (_a = this.__Options.name) !== null && _a !== void 0 ? _a : this.__Model.modelName;
        },
        enumerable: false,
        configurable: true
    });
    ModelDao.prototype.create = function (docs) {
        return __awaiter(this, void 0, void 0, function () {
            var populate, data, _data, data_1, data_1_1, res, item, e_1_1;
            var e_1, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        populate = this.__Options.populate;
                        return [4, this.__Model.create(docs)];
                    case 1:
                        data = _b.sent();
                        if (!lodash_1.isArray(data)) return [3, 10];
                        _data = [];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 7, 8, 9]);
                        data_1 = __values(data), data_1_1 = data_1.next();
                        _b.label = 3;
                    case 3:
                        if (!!data_1_1.done) return [3, 6];
                        res = data_1_1.value;
                        return [4, bluebird_1.promisifyAll(res).populateAsync(populate)];
                    case 4:
                        item = _b.sent();
                        _data.push(item);
                        _b.label = 5;
                    case 5:
                        data_1_1 = data_1.next();
                        return [3, 3];
                    case 6: return [3, 9];
                    case 7:
                        e_1_1 = _b.sent();
                        e_1 = { error: e_1_1 };
                        return [3, 9];
                    case 8:
                        try {
                            if (data_1_1 && !data_1_1.done && (_a = data_1.return)) _a.call(data_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7];
                    case 9: return [2, _data];
                    case 10: return [4, bluebird_1.promisifyAll(data).populateAsync(populate)];
                    case 11: return [2, _b.sent()];
                }
            });
        });
    };
    ModelDao.prototype.findOne = function (conditions, options) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var _c, select, populate, data;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _c = this.__Options, select = _c.select, populate = _c.populate;
                        return [4, this.__Model.findOne(conditions)
                                .select((_a = options === null || options === void 0 ? void 0 : options.select) !== null && _a !== void 0 ? _a : select)
                                .populate((_b = options === null || options === void 0 ? void 0 : options.populate) !== null && _b !== void 0 ? _b : populate)];
                    case 1:
                        data = _d.sent();
                        return [2, data];
                }
            });
        });
    };
    ModelDao.prototype.find = function (conditions, options) {
        var _a, _b, _c, _d, _e, _f, _g;
        return __awaiter(this, void 0, void 0, function () {
            var _h, select, populate, sort, limit, data;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        _h = this.__Options, select = _h.select, populate = _h.populate, sort = _h.sort, limit = _h.limit;
                        return [4, this.__Model.find(__assign({}, conditions))
                                .select((_a = options === null || options === void 0 ? void 0 : options.select) !== null && _a !== void 0 ? _a : select)
                                .populate((_b = options === null || options === void 0 ? void 0 : options.populate) !== null && _b !== void 0 ? _b : populate)
                                .sort((_d = (_c = options === null || options === void 0 ? void 0 : options.sort) !== null && _c !== void 0 ? _c : sort) !== null && _d !== void 0 ? _d : { _id: 1 })
                                .limit((_f = (_e = options === null || options === void 0 ? void 0 : options.limit) !== null && _e !== void 0 ? _e : limit) !== null && _f !== void 0 ? _f : 10)
                                .skip((_g = options === null || options === void 0 ? void 0 : options.skip) !== null && _g !== void 0 ? _g : 0)];
                    case 1:
                        data = _j.sent();
                        return [2, data];
                }
            });
        });
    };
    ModelDao.prototype.counts = function (conditions) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (conditions) {
                    return [2, this.__Model.countDocuments(conditions)];
                }
                return [2, this.__Model.estimatedDocumentCount()];
            });
        });
    };
    ModelDao.prototype.list = function (conditions, options) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var data, counts, limit;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4, this.find(conditions, options)];
                    case 1:
                        data = _c.sent();
                        return [4, this.counts(conditions)];
                    case 2:
                        counts = _c.sent();
                        limit = (_b = (_a = options === null || options === void 0 ? void 0 : options.limit) !== null && _a !== void 0 ? _a : this.__Options.limit) !== null && _b !== void 0 ? _b : 10;
                        return [2, { data: data, counts: counts, limit: limit }];
                }
            });
        });
    };
    ModelDao.prototype.updateOne = function (conditions, doc, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.__Model.updateOne(conditions, doc, __assign({}, options))];
            });
        });
    };
    ModelDao.prototype.updateMany = function (conditions, doc, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.__Model.updateMany(__assign({}, conditions), doc, __assign({}, options))];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    ModelDao.prototype.remove = function (conditions) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.__Model.deleteMany(__assign({}, conditions))];
            });
        });
    };
    ModelDao.prototype.clear = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.remove()];
                    case 1:
                        _a.sent();
                        return [4, this.__Model.collection.dropIndexes()];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    return ModelDao;
}());
exports.ModelDao = ModelDao;
exports.modelDao = function (model, options) { return new ModelDao(model, options); };
