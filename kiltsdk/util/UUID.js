"use strict";
/**
 * Universally unique identifiers (UUIDs) are needed in KILT to uniquely identify specific information.
 * ***
 * UUIDs are used for example in [[RequestForAttestation]] to generate hashes.
 * @module UUID
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Dummy comment needed for correct doc display, do not remove
 */
const uuid_1 = require("uuid");
const types_1 = require("@polkadot/types");
/**
 * Generates a H256 compliant UUID.
 */
function generate() {
    return new types_1.Hash(uuid_1.v4()).toString();
}
exports.generate = generate;
exports.default = {
    generate,
};
//# sourceMappingURL=UUID.js.map