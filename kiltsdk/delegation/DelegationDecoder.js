"use strict";
/**
 * When [[DelegationNode]]s or [[DelegationRootNode]]s are written on the blockchain, they're encoded.
 * DelegationDecoder helps to decode them when they're queried from the chain.
 * ***
 * The DelegationDecoder methods transform a [[QueryResult]] into an object of a KILT type.
 * @module Delegation/DelegationDecoder
 * @preferred
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Crypto_1 = require("../crypto/Crypto");
const DelegationNode_1 = tslib_1.__importDefault(require("./DelegationNode"));
const DelegationRootNode_1 = tslib_1.__importDefault(require("./DelegationRootNode"));
const Delegation_1 = require("../types/Delegation");
function decodeRootDelegation(encoded) {
    const json = encoded && encoded.encodedLength ? encoded.toJSON() : null;
    if (json instanceof Array) {
        return Object.assign(Object.create(DelegationRootNode_1.default.prototype), {
            cTypeHash: json[0],
            account: json[1],
            revoked: json[2],
        });
    }
    return null;
}
exports.decodeRootDelegation = decodeRootDelegation;
/**
 * Decode the permissions from the bitset encoded in the given `number`.
 * We use bitwise `AND` to check if a permission bit flag is set.
 *
 * @param bitset the u32 number used as the bitset to encode permissions
 */
function decodePermissions(bitset) {
    const permissions = [];
    // eslint-disable-next-line no-bitwise
    if (bitset & Delegation_1.Permission.ATTEST) {
        permissions.push(Delegation_1.Permission.ATTEST);
    }
    // eslint-disable-next-line no-bitwise
    if (bitset & Delegation_1.Permission.DELEGATE) {
        permissions.push(Delegation_1.Permission.DELEGATE);
    }
    return permissions;
}
/**
 * Checks if `rootId` is set (to something different than `0`)
 * @param rootId the root id part of the query result for delegation nodes
 */
function verifyRoot(rootId) {
    const rootU8 = Crypto_1.coToUInt8(rootId);
    return (rootU8.reduce((accumulator, currentValue) => accumulator + currentValue) > 0);
}
function decodeDelegationNode(encoded) {
    const json = encoded && encoded.encodedLength ? encoded.toJSON() : null;
    if (json instanceof Array) {
        if (!verifyRoot(json[0])) {
            // Query returns 0x0 for rootId if queried for a root id instead of a node id.
            // A node without a root node is therefore interpreted as invalid.
            return null;
        }
        return Object.assign(Object.create(DelegationNode_1.default.prototype), {
            rootId: json[0],
            parentId: json[1],
            account: json[2],
            permissions: decodePermissions(json[3]),
            revoked: json[4],
        });
    }
    return null;
}
exports.decodeDelegationNode = decodeDelegationNode;
//# sourceMappingURL=DelegationDecoder.js.map