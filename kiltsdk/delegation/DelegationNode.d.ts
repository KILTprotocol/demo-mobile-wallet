/**
 * Delegation nodes are used within the KILT protocol to construct the trust hierarchy.
 * ***
 *  Starting from the root node, entities can delegate the right to issue attestations to Claimers for a certain CTYPE and also delegate the right to attest and to delegate further nodes.
 * @module Delegation/DelegationNode
 * @preferred
 */
import { QueryResult } from '../blockchain/Blockchain';
import TxStatus from '../blockchain/TxStatus';
import Identity from '../identity/Identity';
import DelegationBaseNode from './Delegation';
import DelegationRootNode from './DelegationRootNode';
import { IDelegationNode } from '../types/Delegation';
export default class DelegationNode extends DelegationBaseNode implements IDelegationNode {
    /**
     * @description Queries the delegation node with [delegationId].
     *
     * @param delegationId the unique identifier of the desired delegation
     * @returns promise containing the [[DelegationNode]] or [null]
     */
    static query(delegationId: string): Promise<DelegationNode | null>;
    rootId: IDelegationNode['rootId'];
    parentId?: IDelegationNode['parentId'];
    permissions: IDelegationNode['permissions'];
    /**
     * @description Creates a new [DelegationNode].
     *
     * @param id a unique identifier
     * @param rootId identifier of the root delegation node that is already stored on-chain
     * @param account address of the account that will be the owner of the delegation
     * @param permissions list of [[Permission]]s
     * @param parentId identifier of the parent delegation node already stored on-chain. Not required when the parent is the root node.
     */
    constructor(id: IDelegationNode['id'], rootId: IDelegationNode['rootId'], account: IDelegationNode['account'], permissions: IDelegationNode['permissions'], parentId?: IDelegationNode['parentId']);
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
    generateHash(): string;
    /**
     * @description Fetches the root of this delegation node.
     * @returns promise containing the [[DelegationRootNode]] of this delegation node
     */
    getRoot(): Promise<DelegationRootNode>;
    /**
     * @description Fetches the parent node of this delegation node.
     * @returns promise containing the parent as [[DelegationBaseNode]] or [null]
     */
    getParent(): Promise<DelegationBaseNode | null>;
    /**
     * @description Stores the delegation node on chain.
     *
     * @param identity account used to store the delegation node
     * @param signature signature of the delegate to ensure it's done under his permission
     * @returns promise containing the [[TxStatus]]
     */
    store(identity: Identity, signature: string): Promise<TxStatus>;
    /**
     * @description Verifies the delegation node by querying it from chain and checking its revoke status.
     * @returns promise containing a boolean flag
     */
    verify(): Promise<boolean>;
    /**
     * @description Revokes the delegation node on chain.
     * @param identity the identity used to revoke the delegation
     * @returns promise containing the [[TxStatus]]
     */
    revoke(identity: Identity): Promise<TxStatus>;
    protected decodeChildNode(queryResult: QueryResult): DelegationNode | null;
}
