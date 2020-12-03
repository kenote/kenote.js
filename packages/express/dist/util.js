"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClientIP = void 0;
function getClientIP(req) {
    var headers = req.headers;
    return headers['x-forwarded-for'] || headers['x-real-ip'] || req.connection.remoteAddress || req.ip;
}
exports.getClientIP = getClientIP;
