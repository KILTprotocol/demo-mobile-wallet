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
import Identity from '../identity/Identity';
import Attestation from '../attestation/Attestation';
import TxStatus from '../blockchain/TxStatus';
import { IDelegationBaseNode } from '../types/Delegation';
import DelegationNode from './DelegationNode';
import DelegationRootNode from './DelegationRootNode';
import { QueryResult } from '../blockchain/Blockchain';
export default abstract class DelegationBaseNode implements IDelegationBaseNode {
    id: IDelegationBaseNode['id'];
    account: IDelegationBaseNode['account'];
    revoked: IDelegationBaseNode['revoked'];
    /**
     * @description Builds a new [DelegationBaseNode] instance.
     * @param id the unique identifier of the delegation node
     * @param account the owner address of the delegation node
     */
    constructor(id: IDelegationBaseNode['id'], account: IDelegationBaseNode['account']);
    /**
     * @description Fetches the root of the delegation tree.
     * @returns promise containing [[DelegationRootNode]]
     */
    abstract getRoot(): Promise<DelegationRootNode>;
    /**
     * @description Fetches the parent delegation node. If the parent node is [null] this node is a direct child of the root node.
     * @returns promise containing the parent node or [null]
     */
    abstract getParent(): Promise<DelegationBaseNode | null>;
    /**
     * @description Fetches the children nodes of the current node.
     * @returns promise containing the resolved children nodes
     */
    getChildren(): Promise<DelegationNode[]>;
    /**
     * @description Fetches and resolves all attestations attested with this delegation node.
     * @returns promise containing all resolved attestations attested with this node
     */
    getAttestations(): Promise<Attestation[]>;
    /**
     * @description Fetches all hashes of attestations attested with this delegation node.
     * @returns promise containing all attestation hashes attested with this node
     */
    getAttestationHashes(): Promise<string[]>;
    /**
     * @description Verifies this delegation node by querying it from chain and checking its [revoked] status.
     * @returns promise containing a boolean flag indicating if the verification succeeded
     */
    abstract verify(): Promise<boolean>;
    /**
     * @description Revokes this delegation node on chain.
     * @returns promise containing the transaction status
     */
    abstract revoke(identity: Identity): Promise<TxStatus>;
    /**
     * Required to avoid cyclic dependencies btw. DelegationBaseNode and DelegationNode implementations.
     */
    protected abstract decodeChildNode(queryResult: QueryResult): DelegationNode | null;
}
