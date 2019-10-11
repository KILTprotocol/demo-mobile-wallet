"use strict";
/**
 * @module Delegation/DelegationNode
 */
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@polkadot/types");
const blockchainApiConnection_1 = require("../blockchainApiConnection");
const DelegationDecoder_1 = require("./DelegationDecoder");
const DelegationNode_utils_1 = require("./DelegationNode.utils");
async function store(delegation, identity, signature) {
    const blockchain = await blockchainApiConnection_1.getCached();
    const includeParentId = delegation.parentId
        ? delegation.parentId !== delegation.rootId
        : false;
    const tx = await blockchain.api.tx.delegation.addDelegation(delegation.id, delegation.rootId, new types_1.Option(types_1.Text, includeParentId ? delegation.parentId : undefined), delegation.account, DelegationNode_utils_1.permissionsAsBitset(delegation), signature);
    return blockchain.submitTx(identity, tx);
}
exports.store = store;
async function query(delegationId) {
    const blockchain = await blockchainApiConnection_1.getCached();
    const decoded = DelegationDecoder_1.decodeDelegationNode(await blockchain.api.query.delegation.delegations(delegationId));
    if (decoded) {
        decoded.id = delegationId;
    }
    return decoded;
}
exports.query = query;
async function revoke(delegationId, identity) {
    const blockchain = await blockchainApiConnection_1.getCached();
    const tx = await blockchain.api.tx.delegation.revokeDelegation(delegationId);
    return blockchain.submitTx(identity, tx);
}
exports.revoke = revoke;
//# sourceMappingURL=DelegationNode.chain.js.map