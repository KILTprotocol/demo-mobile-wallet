"use strict";
/**
 * @module CType
 */
Object.defineProperty(exports, "__esModule", { value: true });
const blockchainApiConnection_1 = require("../blockchainApiConnection");
const ConfigLog_1 = require("../config/ConfigLog");
const log = ConfigLog_1.factory.getLogger('CType');
async function store(ctype, identity) {
    const blockchain = await blockchainApiConnection_1.getCached();
    log.debug(() => `Create tx for 'ctype.add'`);
    const tx = await blockchain.api.tx.ctype.add(ctype.hash);
    const txStatus = await blockchain.submitTx(identity, tx);
    if (txStatus.type === 'Finalised') {
        txStatus.payload = Object.assign({}, ctype, { owner: identity.address });
    }
    return txStatus;
}
exports.store = store;
function decode(encoded) {
    return encoded && encoded.encodedLength ? encoded.toString() : null;
}
async function getOwner(ctypeHash) {
    const blockchain = await blockchainApiConnection_1.getCached();
    const encoded = await blockchain.api.query.ctype.cTYPEs(ctypeHash);
    const queriedCTypeAccount = decode(encoded);
    return queriedCTypeAccount;
}
exports.getOwner = getOwner;
//# sourceMappingURL=CType.chain.js.map