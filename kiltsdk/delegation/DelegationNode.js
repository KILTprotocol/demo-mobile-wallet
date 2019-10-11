"use strict";
/**
 * Delegation nodes are used within the KILT protocol to construct the trust hierarchy.
 * ***
 *  Starting from the root node, entities can delegate the right to issue attestations to Claimers for a certain CTYPE and also delegate the right to attest and to delegate further nodes.
 * @module Delegation/DelegationNode
 * @preferred
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/**
 * Dummy comment needed for correct doc display, do not remove
 */
const crypto_1 = tslib_1.__importDefault(require("../crypto"));
const ConfigLog_1 = require("../config/ConfigLog");
const Crypto_1 = require("../crypto/Crypto");
const Delegation_1 = tslib_1.__importDefault(require("./Delegation"));
const DelegationDecoder_1 = require("./DelegationDecoder");
const DelegationNode_utils_1 = require("./DelegationNode.utils");
const DelegationNode_chain_1 = require("./DelegationNode.chain");
const DelegationRootNode_chain_1 = require("./DelegationRootNode.chain");
const log = ConfigLog_1.factory.getLogger('DelegationNode');
class DelegationNode extends Delegation_1.default {
    /**
     * @description Queries the delegation node with [delegationId].
     *
     * @param delegationId the unique identifier of the desired delegation
     * @returns promise containing the [[DelegationNode]] or [null]
     */
    static async query(delegationId) {
        log.info(`:: query('${delegationId}')`);
        const result = await DelegationNode_chain_1.query(delegationId);
        log.info(`result: ${JSON.stringify(result)}`);
        return result;
    }
    /**
     * @description Creates a new [DelegationNode].
     *
     * @param id a unique identifier
     * @param rootId identifier of the root delegation node that is already stored on-chain
     * @param account address of the account that will be the owner of the delegation
     * @param permissions list of [[Permission]]s
     * @param parentId identifier of the parent delegation node already stored on-chain. Not required when the parent is the root node.
     */
    constructor(id, rootId, account, permissions, parentId) {
        super(id, account);
        this.permissions = permissions;
        this.rootId = rootId;
        this.parentId = parentId;
    }
    /**
     * @description Generates the delegation hash from the delegations' property values.
     *
     * <BR>
     * This hash is signed by the delegate and later stored along with the delegation to
     * make sure delegation data (such as permissions) is not tampered.
     *
     * @example
     * <BR>
     * ```
     * const delegate: Identity = ...
     * const signature:string = delegate.signStr(newDelegationNode.generateHash())
     *
     * const myIdentity: Identity = ...
     * newDelegationNode.store(myIdentity, signature)
     * ```
     *
     * @returns the hash representation of this delegation as a hex string
     */
    generateHash() {
        const propsToHash = [this.id, this.rootId];
        if (this.parentId && this.parentId !== this.rootId) {
            propsToHash.push(this.parentId);
        }
        const uint8Props = propsToHash.map(value => {
            return Crypto_1.coToUInt8(value);
        });
        uint8Props.push(DelegationNode_utils_1.permissionsAsBitset(this));
        const generated = Crypto_1.u8aToHex(crypto_1.default.hash(Crypto_1.u8aConcat(...uint8Props), 256));
        log.debug(`generateHash(): ${generated}`);
        return generated;
    }
    /**
     * @description Fetches the root of this delegation node.
     * @returns promise containing the [[DelegationRootNode]] of this delegation node
     */
    async getRoot() {
        const rootNode = await DelegationRootNode_chain_1.query(this.rootId);
        if (!rootNode) {
            throw new Error(`Could not find root node with id ${this.rootId}`);
        }
        return rootNode;
    }
    /**
     * @description Fetches the parent node of this delegation node.
     * @returns promise containing the parent as [[DelegationBaseNode]] or [null]
     */
    async getParent() {
        if (!this.parentId) {
            // parent must be root
            return this.getRoot();
        }
        return DelegationNode_chain_1.query(this.parentId);
    }
    /**
     * @description Stores the delegation node on chain.
     *
     * @param identity account used to store the delegation node
     * @param signature signature of the delegate to ensure it's done under his permission
     * @returns promise containing the [[TxStatus]]
     */
    async store(identity, signature) {
        log.info(`:: store(${this.id})`);
        return DelegationNode_chain_1.store(this, identity, signature);
    }
    /**
     * @description Verifies the delegation node by querying it from chain and checking its revoke status.
     * @returns promise containing a boolean flag
     */
    async verify() {
        const node = await DelegationNode_chain_1.query(this.id);
        return node !== null && !node.revoked;
    }
    /**
     * @description Revokes the delegation node on chain.
     * @param identity the identity used to revoke the delegation
     * @returns promise containing the [[TxStatus]]
     */
    async revoke(identity) {
        log.debug(`:: revoke(${this.id})`);
        return DelegationNode_chain_1.revoke(this.id, identity);
    }
    /* eslint-disable class-methods-use-this */
    decodeChildNode(queryResult) {
        return DelegationDecoder_1.decodeDelegationNode(queryResult);
    }
}
exports.default = DelegationNode;
//# sourceMappingURL=DelegationNode.js.map