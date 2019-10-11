"use strict";
/**
 *  Blockchain bridges that connects the SDK and the KILT Blockchain.
 *  ***
 *  Communicates with the chain via WebSockets and can [[listenToBlocks]]. It exposes the [[submitTx]] function that performs a transaction.
 * @module Blockchain
 * @preferred
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ErrorHandler_1 = require("../errorhandling/ErrorHandler");
const ConfigLog_1 = require("../config/ConfigLog");
const ExtrinsicError_1 = require("../errorhandling/ExtrinsicError");
const TxStatus_1 = tslib_1.__importDefault(require("./TxStatus"));
const log = ConfigLog_1.factory.getLogger('Blockchain');
// Code taken from
// https://polkadot.js.org/api/api/classes/_promise_index_.apipromise.html
class Blockchain {
    static asArray(queryResult) {
        const json = queryResult && queryResult.encodedLength ? queryResult.toJSON() : null;
        if (json instanceof Array) {
            return json;
        }
        return [];
    }
    constructor(api) {
        this.api = api;
        this.errorHandler = new ErrorHandler_1.ErrorHandler(api);
    }
    async getStats() {
        const [chain, nodeName, nodeVersion] = await Promise.all([
            this.api.rpc.system.chain(),
            this.api.rpc.system.name(),
            this.api.rpc.system.version(),
        ]);
        return { chain, nodeName, nodeVersion };
    }
    // TODO: implement unsubscribe as subscriptionId continuously increases
    async listenToBlocks(listener) {
        const subscriptionId = await this.api.rpc.chain.subscribeNewHead(listener);
        return subscriptionId;
    }
    async submitTx(identity, tx) {
        const accountAddress = identity.address;
        const nonce = await this.getNonce(accountAddress);
        const signed = identity.signSubmittableExtrinsic(tx, nonce.toHex());
        log.info(`Submitting ${tx.method}`);
        return new Promise((resolve, reject) => {
            signed
                .send((result) => {
                log.info(`Got tx status '${result.status.type}'`);
                const { status } = result;
                if (ErrorHandler_1.ErrorHandler.extrinsicFailed(result)) {
                    log.warn(`Extrinsic execution failed`);
                    log.debug(`Transaction detail: ${JSON.stringify(result, null, 2)}`);
                    const extrinsicError = this.errorHandler.getExtrinsicError(result) || ExtrinsicError_1.ERROR_UNKNOWN;
                    log.warn(`Extrinsic error ocurred: ${extrinsicError}`);
                    reject(extrinsicError);
                }
                if (status.type === 'Finalised') {
                    resolve(new TxStatus_1.default(status.type));
                }
                else if (status.type === 'Invalid' || status.type === 'Dropped') {
                    reject(new Error(`Transaction failed with status '${status.type}'`));
                }
            })
                .catch((err) => {
                // just reject with the original tx error from the chain
                reject(err);
            });
        });
    }
    async getNonce(accountAddress) {
        const nonce = await this.api.query.system.accountNonce(accountAddress);
        if (!nonce) {
            throw Error(`Nonce not found for account ${accountAddress}`);
        }
        return nonce;
    }
}
exports.default = Blockchain;
//# sourceMappingURL=Blockchain.js.map