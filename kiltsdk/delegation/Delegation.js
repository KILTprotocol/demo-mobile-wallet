"use strict";
/**
 * Delegations are the building blocks of top-down trust structures in KILT. An Attester can inherit trust through delegation from another attester ("top-down").
 * In order to model these trust hierarchies, a delegation is represented as a **node** in a **delegation tree**.
 * ***
 * A delegation object is stored on-chain, and can be revoked. A base node is created, a ID which may be used in a [[RequestForAttestation]].
 *
 * A delegation can and may restrict permissions.
 *
 * Permissions:
 *
 *  * Delegate
 *  * Attest
 * @module Delegation
 * @preferred
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Dummy comment needed for correct doc display, do not remove
 */
const ConfigLog_1 = require("../config/ConfigLog");
const Delegation_chain_1 = require("./Delegation.chain");
const Attestation_chain_1 = require("../attestation/Attestation.chain");
const log = ConfigLog_1.factory.getLogger('DelegationBaseNode');
class DelegationBaseNode {
    /**
     * @description Builds a new [DelegationBaseNode] instance.
     * @param id the unique identifier of the delegation node
     * @param account the owner address of the delegation node
     */
    constructor(id, account) {
        this.revoked = false;
        this.account = account;
        this.id = id;
    }
    /**
     * @description Fetches the children nodes of the current node.
     * @returns promise containing the resolved children nodes
     */
    async getChildren() {
        log.info(` :: getChildren('${this.id}')`);
        const childIds = await Delegation_chain_1.getChildIds(this.id);
        const queryResults = await Delegation_chain_1.fetchChildren(childIds);
        const children = queryResults
            .map((codec) => {
            const decoded = this.decodeChildNode(codec.codec);
            if (decoded) {
                decoded.id = codec.id;
            }
            return decoded;
        })
            .filter((value) => {
            return value !== null;
        });
        log.info(`children: ${JSON.stringify(children)}`);
        return children;
    }
    /**
     * @description Fetches and resolves all attestations attested with this delegation node.
     * @returns promise containing all resolved attestations attested with this node
     */
    async getAttestations() {
        const attestationHashes = await this.getAttestationHashes();
        const attestations = await Promise.all(attestationHashes.map((claimHash) => {
            return Attestation_chain_1.query(claimHash);
        }));
        return attestations.filter((value) => !!value);
    }
    /**
     * @description Fetches all hashes of attestations attested with this delegation node.
     * @returns promise containing all attestation hashes attested with this node
     */
    async getAttestationHashes() {
        return Delegation_chain_1.getAttestationHashes(this.id);
    }
}
exports.default = DelegationBaseNode;
//# sourceMappingURL=Delegation.js.map