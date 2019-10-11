"use strict";
/**
 * @module Delegation/DelegationRootNode
 */
Object.defineProperty(exports, "__esModule", { value: true });
const blockchainApiConnection_1 = require("../blockchainApiConnection");
const DelegationDecoder_1 = require("./DelegationDecoder");
async function store(delegation, identity) {
    const blockchain = await blockchainApiConnection_1.getCached();
    const tx = await blockchain.api.tx.delegation.createRoot(delegation.id, delegation.cTypeHash);
    return blockchain.submitTx(identity, tx);
}
exports.store = store;
async function query(delegationId) {
    const blockchain = await blockchainApiConnection_1.getCached();
    const root = DelegationDecoder_1.decodeRootDelegation(await blockchain.api.query.delegation.root(delegationId));
    if (root) {
        root.id = delegationId;
        return root;
    }
    return root;
}
exports.query = query;
async function revoke(delegation, identity) {
    const blockchain = await blockchainApiConnection_1.getCached();
    const tx = await blockchain.api.tx.delegation.revokeRoot(delegation.id);
    return blockchain.submitTx(identity, tx);
}
exports.revoke = revoke;
//# sourceMappingURL=DelegationRootNode.chain.js.map