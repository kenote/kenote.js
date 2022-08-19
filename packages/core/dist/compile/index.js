"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var build_1 = require("./build");
var develop_1 = require("./develop");
var _a = __read(process.argv.slice(2), 1), argv_type = _a[0];
if (argv_type === 'build') {
    build_1.runBuild();
}
else if (['dev', 'develop', 'start'].includes(argv_type)) {
    develop_1.runDevelop();
}
