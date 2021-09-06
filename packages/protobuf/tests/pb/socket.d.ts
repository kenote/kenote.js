import * as $protobuf from "protobufjs";
/** Namespace com. */
export namespace com {

    /** Namespace socket. */
    namespace socket {

        /** Properties of a MSG_REQUEST_BASE. */
        interface IMSG_REQUEST_BASE {

            /** MSG_REQUEST_BASE msgtype */
            msgtype: number;

            /** MSG_REQUEST_BASE payload */
            payload?: (com.socket.IMSG_REQUEST_PAYLOAD|null);
        }

        /** Represents a MSG_REQUEST_BASE. */
        class MSG_REQUEST_BASE implements IMSG_REQUEST_BASE {

            /**
             * Constructs a new MSG_REQUEST_BASE.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.socket.IMSG_REQUEST_BASE);

            /** MSG_REQUEST_BASE msgtype. */
            public msgtype: number;

            /** MSG_REQUEST_BASE payload. */
            public payload?: (com.socket.IMSG_REQUEST_PAYLOAD|null);

            /**
             * Creates a new MSG_REQUEST_BASE instance using the specified properties.
             * @param [properties] Properties to set
             * @returns MSG_REQUEST_BASE instance
             */
            public static create(properties?: com.socket.IMSG_REQUEST_BASE): com.socket.MSG_REQUEST_BASE;

            /**
             * Encodes the specified MSG_REQUEST_BASE message. Does not implicitly {@link com.socket.MSG_REQUEST_BASE.verify|verify} messages.
             * @param message MSG_REQUEST_BASE message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.socket.IMSG_REQUEST_BASE, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MSG_REQUEST_BASE message, length delimited. Does not implicitly {@link com.socket.MSG_REQUEST_BASE.verify|verify} messages.
             * @param message MSG_REQUEST_BASE message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.socket.IMSG_REQUEST_BASE, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MSG_REQUEST_BASE message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MSG_REQUEST_BASE
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): com.socket.MSG_REQUEST_BASE;

            /**
             * Decodes a MSG_REQUEST_BASE message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MSG_REQUEST_BASE
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): com.socket.MSG_REQUEST_BASE;

            /**
             * Verifies a MSG_REQUEST_BASE message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MSG_REQUEST_BASE message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MSG_REQUEST_BASE
             */
            public static fromObject(object: { [k: string]: any }): com.socket.MSG_REQUEST_BASE;

            /**
             * Creates a plain object from a MSG_REQUEST_BASE message. Also converts values to other types if specified.
             * @param message MSG_REQUEST_BASE
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: com.socket.MSG_REQUEST_BASE, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MSG_REQUEST_BASE to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a MSG_REQUEST_PAYLOAD. */
        interface IMSG_REQUEST_PAYLOAD {

            /** MSG_REQUEST_PAYLOAD username */
            username?: (string|null);
        }

        /** Represents a MSG_REQUEST_PAYLOAD. */
        class MSG_REQUEST_PAYLOAD implements IMSG_REQUEST_PAYLOAD {

            /**
             * Constructs a new MSG_REQUEST_PAYLOAD.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.socket.IMSG_REQUEST_PAYLOAD);

            /** MSG_REQUEST_PAYLOAD username. */
            public username: string;

            /**
             * Creates a new MSG_REQUEST_PAYLOAD instance using the specified properties.
             * @param [properties] Properties to set
             * @returns MSG_REQUEST_PAYLOAD instance
             */
            public static create(properties?: com.socket.IMSG_REQUEST_PAYLOAD): com.socket.MSG_REQUEST_PAYLOAD;

            /**
             * Encodes the specified MSG_REQUEST_PAYLOAD message. Does not implicitly {@link com.socket.MSG_REQUEST_PAYLOAD.verify|verify} messages.
             * @param message MSG_REQUEST_PAYLOAD message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.socket.IMSG_REQUEST_PAYLOAD, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MSG_REQUEST_PAYLOAD message, length delimited. Does not implicitly {@link com.socket.MSG_REQUEST_PAYLOAD.verify|verify} messages.
             * @param message MSG_REQUEST_PAYLOAD message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.socket.IMSG_REQUEST_PAYLOAD, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MSG_REQUEST_PAYLOAD message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MSG_REQUEST_PAYLOAD
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): com.socket.MSG_REQUEST_PAYLOAD;

            /**
             * Decodes a MSG_REQUEST_PAYLOAD message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MSG_REQUEST_PAYLOAD
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): com.socket.MSG_REQUEST_PAYLOAD;

            /**
             * Verifies a MSG_REQUEST_PAYLOAD message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MSG_REQUEST_PAYLOAD message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MSG_REQUEST_PAYLOAD
             */
            public static fromObject(object: { [k: string]: any }): com.socket.MSG_REQUEST_PAYLOAD;

            /**
             * Creates a plain object from a MSG_REQUEST_PAYLOAD message. Also converts values to other types if specified.
             * @param message MSG_REQUEST_PAYLOAD
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: com.socket.MSG_REQUEST_PAYLOAD, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MSG_REQUEST_PAYLOAD to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }
}
