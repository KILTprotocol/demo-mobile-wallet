"use strict";
/**
 * @module DID
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/**
 * Dummy comment needed for correct doc display, do not remove.
 */
const util_1 = require("@polkadot/util");
const Did_1 = tslib_1.__importStar(require("./Did"));
function decodeDid(identifier, encoded) {
    const json = encoded && encoded.encodedLength ? encoded.toJSON() : null;
    if (json instanceof Array) {
        const documentStore = util_1.hexToU8a(json[2]);
        return Object.assign(Object.create(Did_1.default.prototype), {
            identifier,
            publicSigningKey: json[0],
            publicBoxKey: json[1],
            documentStore: documentStore.length > 0 ? util_1.u8aToString(documentStore) : null,
        });
    }
    return null;
}
exports.decodeDid = decodeDid;
function getIdentifierFromAddress(address) {
    return Did_1.IDENTIFIER_PREFIX + address;
}
exports.getIdentifierFromAddress = getIdentifierFromAddress;
function getAddressFromIdentifier(identifier) {
    if (!identifier.startsWith(Did_1.IDENTIFIER_PREFIX)) {
        throw new Error(`Not a KILT did: ${identifier}`);
    }
    return identifier.substr(Did_1.IDENTIFIER_PREFIX.length);
}
exports.getAddressFromIdentifier = getAddressFromIdentifier;
//# sourceMappingURL=Did.utils.js.map