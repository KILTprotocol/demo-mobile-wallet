"use strict";
/**
 * KILT enables top-down trust structures (see [[Delegation]]). On the lowest level, a delegation structure is always a **tree**. The root of this tree is DelegationRootNode.
 * ***
 * Apart from inheriting [[DelegationBaseNode]]'s structure, a DelegationRootNode has a [[cTypeHash]] property that refers to a specific [[CType]]. A DelegationRootNode is written on-chain, and can be queried by [[delegationId]] via the [[query]] method.
 * ***
 * @module Delegation/DelegationRootNode
 * @preferred
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ConfigLog_1 = require("../config/ConfigLog");
const Delegation_1 = tslib_1.__importDefault(require("./Delegation"));
const DelegationRootNode_chain_1 = require("./DelegationRootNode.chain");
const DelegationDecoder_1 = require("./DelegationDecoder");
const log = ConfigLog_1.factory.getLogger('DelegationRootNode');
class DelegationRootNode extends Delegation_1.default {
    /**
     * @description Queries the delegation root with [delegationId].
     *
     * @param delegationId unique identifier of the delegation root
     * @returns promise containing [[DelegationRootNode]] or [null]
     */
    static async query(delegationId) {
        log.info(`:: query('${delegationId}')`);
        const result = await DelegationRootNode_chain_1.query(delegationId);
        if (result) {
            log.info(`result: ${JSON.stringify(result)}`);
        }
        else {
            log.info(`root node not found`);
        }
        return result;
    }
    constructor(id, ctypeHash, account) {
        super(id, account);
        this.cTypeHash = ctypeHash;
    }
    getRoot() {
        return Promise.resolve(this);
    }
    /* eslint-disable class-methods-use-this */
    getParent() {
        return Promise.resolve(null);
    }
    /* eslint-enable class-methods-use-this */
    /**
     * @description Stores the delegation root node on chain.
     *
     * @param identity the account used to store the delegation root node
     * @returns promise containing the [[TxStatus]]
     */
    async store(identity) {
        log.debug(`:: store(${this.id})`);
        return DelegationRootNode_chain_1.store(this, identity);
    }
    /**
     * @see [[DelegationBaseNode#verify]]
     */
    async verify() {
        const node = await DelegationRootNode_chain_1.query(this.id);
        return node !== null && !node.revoked;
    }
    /**
     * @see [[DelegationBaseNode#revoke]]
     */
    async revoke(identity) {
        log.debug(`:: revoke(${this.id})`);
        return DelegationRootNode_chain_1.revoke(this, identity);
    }
    /* eslint-disable class-methods-use-this */
    decodeChildNode(queryResult) {
        return DelegationDecoder_1.decodeDelegationNode(queryResult);
    }
}
exports.default = DelegationRootNode;
//# sourceMappingURL=DelegationRootNode.js.map