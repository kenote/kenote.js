/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.com = (function() {

    /**
     * Namespace com.
     * @exports com
     * @namespace
     */
    var com = {};

    com.socket = (function() {

        /**
         * Namespace socket.
         * @memberof com
         * @namespace
         */
        var socket = {};

        socket.MSG_REQUEST_BASE = (function() {

            /**
             * Properties of a MSG_REQUEST_BASE.
             * @memberof com.socket
             * @interface IMSG_REQUEST_BASE
             * @property {number} msgtype MSG_REQUEST_BASE msgtype
             * @property {com.socket.IMSG_REQUEST_PAYLOAD|null} [payload] MSG_REQUEST_BASE payload
             */

            /**
             * Constructs a new MSG_REQUEST_BASE.
             * @memberof com.socket
             * @classdesc Represents a MSG_REQUEST_BASE.
             * @implements IMSG_REQUEST_BASE
             * @constructor
             * @param {com.socket.IMSG_REQUEST_BASE=} [properties] Properties to set
             */
            function MSG_REQUEST_BASE(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * MSG_REQUEST_BASE msgtype.
             * @member {number} msgtype
             * @memberof com.socket.MSG_REQUEST_BASE
             * @instance
             */
            MSG_REQUEST_BASE.prototype.msgtype = 0;

            /**
             * MSG_REQUEST_BASE payload.
             * @member {com.socket.IMSG_REQUEST_PAYLOAD|null|undefined} payload
             * @memberof com.socket.MSG_REQUEST_BASE
             * @instance
             */
            MSG_REQUEST_BASE.prototype.payload = null;

            /**
             * Creates a new MSG_REQUEST_BASE instance using the specified properties.
             * @function create
             * @memberof com.socket.MSG_REQUEST_BASE
             * @static
             * @param {com.socket.IMSG_REQUEST_BASE=} [properties] Properties to set
             * @returns {com.socket.MSG_REQUEST_BASE} MSG_REQUEST_BASE instance
             */
            MSG_REQUEST_BASE.create = function create(properties) {
                return new MSG_REQUEST_BASE(properties);
            };

            /**
             * Encodes the specified MSG_REQUEST_BASE message. Does not implicitly {@link com.socket.MSG_REQUEST_BASE.verify|verify} messages.
             * @function encode
             * @memberof com.socket.MSG_REQUEST_BASE
             * @static
             * @param {com.socket.IMSG_REQUEST_BASE} message MSG_REQUEST_BASE message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MSG_REQUEST_BASE.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.msgtype);
                if (message.payload != null && Object.hasOwnProperty.call(message, "payload"))
                    $root.com.socket.MSG_REQUEST_PAYLOAD.encode(message.payload, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified MSG_REQUEST_BASE message, length delimited. Does not implicitly {@link com.socket.MSG_REQUEST_BASE.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.socket.MSG_REQUEST_BASE
             * @static
             * @param {com.socket.IMSG_REQUEST_BASE} message MSG_REQUEST_BASE message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MSG_REQUEST_BASE.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a MSG_REQUEST_BASE message from the specified reader or buffer.
             * @function decode
             * @memberof com.socket.MSG_REQUEST_BASE
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.socket.MSG_REQUEST_BASE} MSG_REQUEST_BASE
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MSG_REQUEST_BASE.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.socket.MSG_REQUEST_BASE();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.msgtype = reader.int32();
                        break;
                    case 2:
                        message.payload = $root.com.socket.MSG_REQUEST_PAYLOAD.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("msgtype"))
                    throw $util.ProtocolError("missing required 'msgtype'", { instance: message });
                return message;
            };

            /**
             * Decodes a MSG_REQUEST_BASE message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.socket.MSG_REQUEST_BASE
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.socket.MSG_REQUEST_BASE} MSG_REQUEST_BASE
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MSG_REQUEST_BASE.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a MSG_REQUEST_BASE message.
             * @function verify
             * @memberof com.socket.MSG_REQUEST_BASE
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            MSG_REQUEST_BASE.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isInteger(message.msgtype))
                    return "msgtype: integer expected";
                if (message.payload != null && message.hasOwnProperty("payload")) {
                    var error = $root.com.socket.MSG_REQUEST_PAYLOAD.verify(message.payload);
                    if (error)
                        return "payload." + error;
                }
                return null;
            };

            /**
             * Creates a MSG_REQUEST_BASE message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof com.socket.MSG_REQUEST_BASE
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {com.socket.MSG_REQUEST_BASE} MSG_REQUEST_BASE
             */
            MSG_REQUEST_BASE.fromObject = function fromObject(object) {
                if (object instanceof $root.com.socket.MSG_REQUEST_BASE)
                    return object;
                var message = new $root.com.socket.MSG_REQUEST_BASE();
                if (object.msgtype != null)
                    message.msgtype = object.msgtype | 0;
                if (object.payload != null) {
                    if (typeof object.payload !== "object")
                        throw TypeError(".com.socket.MSG_REQUEST_BASE.payload: object expected");
                    message.payload = $root.com.socket.MSG_REQUEST_PAYLOAD.fromObject(object.payload);
                }
                return message;
            };

            /**
             * Creates a plain object from a MSG_REQUEST_BASE message. Also converts values to other types if specified.
             * @function toObject
             * @memberof com.socket.MSG_REQUEST_BASE
             * @static
             * @param {com.socket.MSG_REQUEST_BASE} message MSG_REQUEST_BASE
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            MSG_REQUEST_BASE.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.msgtype = 0;
                    object.payload = null;
                }
                if (message.msgtype != null && message.hasOwnProperty("msgtype"))
                    object.msgtype = message.msgtype;
                if (message.payload != null && message.hasOwnProperty("payload"))
                    object.payload = $root.com.socket.MSG_REQUEST_PAYLOAD.toObject(message.payload, options);
                return object;
            };

            /**
             * Converts this MSG_REQUEST_BASE to JSON.
             * @function toJSON
             * @memberof com.socket.MSG_REQUEST_BASE
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            MSG_REQUEST_BASE.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return MSG_REQUEST_BASE;
        })();

        socket.MSG_REQUEST_PAYLOAD = (function() {

            /**
             * Properties of a MSG_REQUEST_PAYLOAD.
             * @memberof com.socket
             * @interface IMSG_REQUEST_PAYLOAD
             * @property {string|null} [username] MSG_REQUEST_PAYLOAD username
             */

            /**
             * Constructs a new MSG_REQUEST_PAYLOAD.
             * @memberof com.socket
             * @classdesc Represents a MSG_REQUEST_PAYLOAD.
             * @implements IMSG_REQUEST_PAYLOAD
             * @constructor
             * @param {com.socket.IMSG_REQUEST_PAYLOAD=} [properties] Properties to set
             */
            function MSG_REQUEST_PAYLOAD(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * MSG_REQUEST_PAYLOAD username.
             * @member {string} username
             * @memberof com.socket.MSG_REQUEST_PAYLOAD
             * @instance
             */
            MSG_REQUEST_PAYLOAD.prototype.username = "";

            /**
             * Creates a new MSG_REQUEST_PAYLOAD instance using the specified properties.
             * @function create
             * @memberof com.socket.MSG_REQUEST_PAYLOAD
             * @static
             * @param {com.socket.IMSG_REQUEST_PAYLOAD=} [properties] Properties to set
             * @returns {com.socket.MSG_REQUEST_PAYLOAD} MSG_REQUEST_PAYLOAD instance
             */
            MSG_REQUEST_PAYLOAD.create = function create(properties) {
                return new MSG_REQUEST_PAYLOAD(properties);
            };

            /**
             * Encodes the specified MSG_REQUEST_PAYLOAD message. Does not implicitly {@link com.socket.MSG_REQUEST_PAYLOAD.verify|verify} messages.
             * @function encode
             * @memberof com.socket.MSG_REQUEST_PAYLOAD
             * @static
             * @param {com.socket.IMSG_REQUEST_PAYLOAD} message MSG_REQUEST_PAYLOAD message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MSG_REQUEST_PAYLOAD.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.username != null && Object.hasOwnProperty.call(message, "username"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.username);
                return writer;
            };

            /**
             * Encodes the specified MSG_REQUEST_PAYLOAD message, length delimited. Does not implicitly {@link com.socket.MSG_REQUEST_PAYLOAD.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.socket.MSG_REQUEST_PAYLOAD
             * @static
             * @param {com.socket.IMSG_REQUEST_PAYLOAD} message MSG_REQUEST_PAYLOAD message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MSG_REQUEST_PAYLOAD.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a MSG_REQUEST_PAYLOAD message from the specified reader or buffer.
             * @function decode
             * @memberof com.socket.MSG_REQUEST_PAYLOAD
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.socket.MSG_REQUEST_PAYLOAD} MSG_REQUEST_PAYLOAD
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MSG_REQUEST_PAYLOAD.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.socket.MSG_REQUEST_PAYLOAD();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.username = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a MSG_REQUEST_PAYLOAD message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.socket.MSG_REQUEST_PAYLOAD
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.socket.MSG_REQUEST_PAYLOAD} MSG_REQUEST_PAYLOAD
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MSG_REQUEST_PAYLOAD.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a MSG_REQUEST_PAYLOAD message.
             * @function verify
             * @memberof com.socket.MSG_REQUEST_PAYLOAD
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            MSG_REQUEST_PAYLOAD.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.username != null && message.hasOwnProperty("username"))
                    if (!$util.isString(message.username))
                        return "username: string expected";
                return null;
            };

            /**
             * Creates a MSG_REQUEST_PAYLOAD message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof com.socket.MSG_REQUEST_PAYLOAD
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {com.socket.MSG_REQUEST_PAYLOAD} MSG_REQUEST_PAYLOAD
             */
            MSG_REQUEST_PAYLOAD.fromObject = function fromObject(object) {
                if (object instanceof $root.com.socket.MSG_REQUEST_PAYLOAD)
                    return object;
                var message = new $root.com.socket.MSG_REQUEST_PAYLOAD();
                if (object.username != null)
                    message.username = String(object.username);
                return message;
            };

            /**
             * Creates a plain object from a MSG_REQUEST_PAYLOAD message. Also converts values to other types if specified.
             * @function toObject
             * @memberof com.socket.MSG_REQUEST_PAYLOAD
             * @static
             * @param {com.socket.MSG_REQUEST_PAYLOAD} message MSG_REQUEST_PAYLOAD
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            MSG_REQUEST_PAYLOAD.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.username = "";
                if (message.username != null && message.hasOwnProperty("username"))
                    object.username = message.username;
                return object;
            };

            /**
             * Converts this MSG_REQUEST_PAYLOAD to JSON.
             * @function toJSON
             * @memberof com.socket.MSG_REQUEST_PAYLOAD
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            MSG_REQUEST_PAYLOAD.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return MSG_REQUEST_PAYLOAD;
        })();

        return socket;
    })();

    return com;
})();

module.exports = $root;
