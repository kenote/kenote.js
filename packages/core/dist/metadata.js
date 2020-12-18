"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMetadataArgsStorage = void 0;
var MetadataArgsStorge = (function () {
    function MetadataArgsStorge() {
        this.controllers = [];
        this.actions = [];
        this.middlewares = [];
        this.application = {
            routeController: []
        };
    }
    MetadataArgsStorge.prototype.reset = function () {
        this.controllers = [];
        this.actions = [];
        this.middlewares = [];
        this.application = {
            routeController: []
        };
    };
    return MetadataArgsStorge;
}());
function getMetadataArgsStorage() {
    if (!global.controllersMetadataArgsStorage) {
        global.controllersMetadataArgsStorage = new MetadataArgsStorge();
    }
    return global.controllersMetadataArgsStorage;
}
exports.getMetadataArgsStorage = getMetadataArgsStorage;
