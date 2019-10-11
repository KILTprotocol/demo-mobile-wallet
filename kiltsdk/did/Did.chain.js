"use strict";
/**
 * @module DID
 */
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@polkadot/types");
const blockchainApiConnection_1 = require("../blockchainApiConnection");
const Did_utils_1 = require("./Did.utils");
async function queryByIdentifier(identifier) {
    const blockchain = await blockchainApiConnection_1.getCached();
    const address = Did_utils_1.getAddressFromIdentifier(identifier);
    const decoded = Did_utils_1.decodeDid(identifier, await blockchain.api.query.dID.dIDs(address));
    return decoded;
}
exports.queryByIdentifier = queryByIdentifier;
async function queryByAddress(address) {
    const blockchain = await blockchainApiConnection_1.getCached();
    const identifier = Did_utils_1.getIdentifierFromAddress(address);
    const decoded = Did_utils_1.decodeDid(identifier, await blockchain.api.query.dID.dIDs(address));
    return decoded;
}
exports.queryByAddress = queryByAddress;
async function remove(identity) {
    const blockchain = await blockchainApiConnection_1.getCached();
    const tx = await blockchain.api.tx.did.remove();
    return blockchain.submitTx(identity, tx);
}
exports.remove = remove;
async function store(did, identity) {
    const blockchain = await blockchainApiConnection_1.getCached();
    const tx = await blockchain.api.tx.did.add(did.publicBoxKey, did.publicSigningKey, new types_1.Option(types_1.Text, did.documentStore));
    return blockchain.submitTx(identity, tx);
}
exports.store = store;
//# sourceMappingURL=Did.chain.js.map