"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ExBuffer = (function () {
    function ExBuffer(bufferLength) {
        this._readOffset = 0;
        this._putOffset = 0;
        this._headLen = 2;
        this._endian = 'B';
        this._readMethod = 'readUInt16BE';
        this._dlen = 0;
        this.slice = Array.prototype.slice;
        this._buffer = Buffer.alloc(bufferLength !== null && bufferLength !== void 0 ? bufferLength : 8192);
    }
    ExBuffer.prototype.uint32Head = function () {
        this._headLen = 4;
        this._readMethod = 'readUInt' + (8 * this._headLen) + '' + this._endian + 'E';
        return this;
    };
    ExBuffer.prototype.ushortHead = function () {
        this._headLen = 2;
        this._readMethod = 'readUInt' + (8 * this._headLen) + '' + this._endian + 'E';
        return this;
    };
    ExBuffer.prototype.littleEndian = function () {
        this._endian = 'L';
        this._readMethod = 'readUInt' + (8 * this._headLen) + '' + this._endian + 'E';
        return this;
    };
    ExBuffer.prototype.bigEndian = function () {
        this._endian = 'B';
        this._readMethod = 'readUInt' + (8 * this._headLen) + '' + this._endian + 'E';
        return this;
    };
    ExBuffer.prototype.once = function (e, cb) {
        var _a;
        if (!this.listeners_once)
            this.listeners_once = {};
        this.listeners_once[e] = (_a = this.listeners_once[e]) !== null && _a !== void 0 ? _a : [];
        if (this.listeners_once[e].indexOf(cb) == -1)
            this.listeners_once[e].push(cb);
    };
    ExBuffer.prototype.on = function (e, cb) {
        var _a;
        if (!this.listeners)
            this.listeners = {};
        this.listeners[e] = (_a = this.listeners[e]) !== null && _a !== void 0 ? _a : [];
        if (this.listeners[e].indexOf(cb) == -1)
            this.listeners[e].push(cb);
    };
    ExBuffer.prototype.off = function (e, cb) {
        var index = -1;
        if (this.listeners && this.listeners[e] && (index = this.listeners[e].indexOf(cb)) != -1)
            this.listeners[e].splice(index);
    };
    ExBuffer.prototype.emit = function (e) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var other_parameters = this.slice.call(arguments, 1);
        if (this.listeners) {
            var list = this.listeners[e];
            if (list) {
                for (var i = 0; i < list.length; ++i) {
                    list[i].apply(this, other_parameters);
                }
            }
        }
        if (this.listeners_once) {
            var list = this.listeners_once[e];
            delete this.listeners_once[e];
            if (list) {
                for (var i = 0; i < list.length; ++i) {
                    list[i].apply(this, other_parameters);
                }
            }
        }
    };
    ExBuffer.prototype.put = function (buffer, offset, len) {
        if (offset == undefined)
            offset = 0;
        if (len == undefined)
            len = buffer.length - offset;
        if (len + this.getLen() > this._buffer.length - 1) {
            var ex = Math.ceil((len + this.getLen()) / (1024));
            var tmp = Buffer.alloc(ex * 1024);
            var exlen = tmp.length - this._buffer.length;
            this._buffer.copy(tmp);
            if (this._putOffset < this._readOffset) {
                if (this._putOffset <= exlen) {
                    tmp.copy(tmp, this._buffer.length, 0, this._putOffset);
                    this._putOffset += this._buffer.length;
                }
                else {
                    tmp.copy(tmp, this._buffer.length, 0, exlen);
                    tmp.copy(tmp, 0, exlen, this._putOffset);
                    this._putOffset -= exlen;
                }
            }
            this._buffer = tmp;
        }
        if (this.getLen() == 0) {
            this._putOffset = this._readOffset = 0;
        }
        if ((this._putOffset + len) > this._buffer.length) {
            var len1 = this._buffer.length - this._putOffset;
            if (len1 > 0) {
                buffer.copy(this._buffer, this._putOffset, offset, offset + len1);
                offset += len1;
            }
            var len2 = len - len1;
            buffer.copy(this._buffer, 0, offset, offset + len2);
            this._putOffset = len2;
        }
        else {
            buffer.copy(this._buffer, this._putOffset, offset, offset + len);
            this._putOffset += len;
        }
        var count = 0;
        while (true) {
            count++;
            if (count > 1000)
                break;
            if (this._dlen == 0) {
                if (this.getLen() < this._headLen) {
                    break;
                }
                if (this._buffer.length - this._readOffset >= this._headLen) {
                    this._dlen = this._buffer[this._readMethod](this._readOffset);
                    this._readOffset += this._headLen;
                }
                else {
                    var hbuf = Buffer.alloc(this._headLen);
                    var rlen = 0;
                    for (var i = 0; i < (this._buffer.length - this._readOffset); i++) {
                        hbuf[i] = this._buffer[this._readOffset++];
                        rlen++;
                    }
                    this._readOffset = 0;
                    for (var i = 0; i < (this._headLen - rlen); i++) {
                        hbuf[rlen + i] = this._buffer[this._readOffset++];
                    }
                    this._dlen = hbuf[this._readMethod](0);
                }
            }
            if (this.getLen() >= this._dlen) {
                var dbuff = Buffer.alloc(this._dlen);
                if (this._readOffset + this._dlen > this._buffer.length) {
                    var len1 = this._buffer.length - this._readOffset;
                    if (len1 > 0) {
                        this._buffer.copy(dbuff, 0, this._readOffset, this._readOffset + len1);
                    }
                    this._readOffset = 0;
                    var len2 = this._dlen - len1;
                    this._buffer.copy(dbuff, len1, this._readOffset, this._readOffset += len2);
                }
                else {
                    this._buffer.copy(dbuff, 0, this._readOffset, this._readOffset += this._dlen);
                }
                try {
                    this._dlen = 0;
                    this.emit('data', dbuff);
                    if (this._readOffset === this._putOffset) {
                        break;
                    }
                }
                catch (error) {
                    this.emit('error', error);
                }
            }
            else {
                break;
            }
        }
    };
    ExBuffer.prototype.getLen = function () {
        if (this._putOffset >= this._readOffset) {
            return this._putOffset - this._readOffset;
        }
        return this._buffer.length - this._readOffset + this._putOffset;
    };
    return ExBuffer;
}());
exports.default = ExBuffer;
