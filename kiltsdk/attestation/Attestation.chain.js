"use strict";
/**
 * @module Attestation
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/**
 * Dummy comment needed for correct doc display, do not remove
 */
const types_1 = require("@polkadot/types");
const blockchainApiConnection_1 = require("../blockchainApiConnection");
const ConfigLog_1 = require("../config/ConfigLog");
const Attestation_1 = tslib_1.__importDefault(require("./Attestation"));
const log = ConfigLog_1.factory.getLogger('Attestation');
async function store(attestation, identity) {
    const txParams = {
        claimHash: attestation.claimHash,
        ctypeHash: attestation.cTypeHash,
        delegationId: new types_1.Option(types_1.Text, attestation.delegationId),
    };
    log.debug(() => `Create tx for 'attestation.add'`);
    const blockchain = await blockchainApiConnection_1.getCached();
    const tx = await blockchain.api.tx.attestation.add(txParams.claimHash, txParams.ctypeHash, txParams.delegationId);
    return blockchain.submitTx(identity, tx);
}
exports.store = store;
function decode(encoded, claimHash) {
    if (encoded && encoded.encodedLength) {
        const attestationTuple = encoded.toJSON();
        const attestation = {
            claimHash,
            cTypeHash: attestationTuple[0],
            owner: attestationTuple[1],
            delegationId: attestationTuple[2],
            revoked: attestationTuple[3],
        };
        log.info(`Decoded attestation: ${JSON.stringify(attestation)}`);
        return Attestation_1.default.fromObject(attestation);
    }
    return null;
}
async function queryRaw(claimHash) {
    log.debug(() => `Query chain for attestations with claim hash ${claimHash}`);
    const blockchain = await blockchainApiConnection_1.getCached();
    const result = await blockchain.api.query.attestation.attestations(claimHash);
    return result;
}
async function query(claimHash) {
    const encoded = await queryRaw(claimHash);
    return decode(encoded, claimHash);
}
exports.query = query;
async function revoke(claimHash, identity) {
    const blockchain = await blockchainApiConnection_1.getCached();
    log.debug(() => `Revoking attestations with claim hash ${claimHash}`);
    const tx = blockchain.api.tx.attestation.revoke(claimHash);
    return blockchain.submitTx(identity, tx);
}
exports.revoke = revoke;
//# sourceMappingURL=Attestation.chain.js.map