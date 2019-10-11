"use strict";
/**
 * @module Delegation
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/**
 * Dummy comment needed for correct doc display, do not remove.
 */
const blockchainApiConnection_1 = require("../blockchainApiConnection");
const Blockchain_1 = tslib_1.__importDefault(require("../blockchain/Blockchain"));
function decodeDelegatedAttestations(queryResult) {
    const json = queryResult && queryResult.encodedLength ? queryResult.toJSON() : [];
    return json;
}
async function getAttestationHashes(id) {
    const blockchain = await blockchainApiConnection_1.getCached();
    const encodedHashes = await blockchain.api.query.attestation.delegatedAttestations(id);
    return decodeDelegatedAttestations(encodedHashes);
}
exports.getAttestationHashes = getAttestationHashes;
async function getChildIds(id) {
    const blockchain = await blockchainApiConnection_1.getCached();
    return Blockchain_1.default.asArray(await blockchain.api.query.delegation.children(id));
}
exports.getChildIds = getChildIds;
async function fetchChildren(childIds) {
    const blockchain = await blockchainApiConnection_1.getCached();
    const val = await Promise.all(childIds.map(async (childId) => {
        const queryResult = await blockchain.api.query.delegation.delegations(childId);
        return {
            id: childId,
            codec: queryResult,
        };
    }));
    return val;
}
exports.fetchChildren = fetchChildren;
//# sourceMappingURL=Delegation.chain.js.map