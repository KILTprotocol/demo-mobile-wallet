/**
 * KILT enables top-down trust structures (see [[Delegation]]). On the lowest level, a delegation structure is always a **tree**. The root of this tree is DelegationRootNode.
 * ***
 * Apart from inheriting [[DelegationBaseNode]]'s structure, a DelegationRootNode has a [[cTypeHash]] property that refers to a specific [[CType]]. A DelegationRootNode is written on-chain, and can be queried by [[delegationId]] via the [[query]] method.
 * ***
 * @module Delegation/DelegationRootNode
 * @preferred
 */
/**
 * Dummy comment needed for correct doc display, do not remove
 */
import { QueryResult } from '../blockchain/Blockchain';
import TxStatus from '../blockchain/TxStatus';
import Identity from '../identity/Identity';
import { IDelegationRootNode } from '../types/Delegation';
import DelegationBaseNode from './Delegation';
import DelegationNode from './DelegationNode';
export default class DelegationRootNode extends DelegationBaseNode implements IDelegationRootNode {
    /**
     * @description Queries the delegation root with [delegationId].
     *
     * @param delegationId unique identifier of the delegation root
     * @returns promise containing [[DelegationRootNode]] or [null]
     */
    static query(delegationId: string): Promise<DelegationRootNode | null>;
    cTypeHash: IDelegationRootNode['cTypeHash'];
    constructor(id: IDelegationRootNode['id'], ctypeHash: IDelegationRootNode['cTypeHash'], account: IDelegationRootNode['account']);
    getRoot(): Promise<DelegationRootNode>;
    getParent(): Promise<DelegationBaseNode | null>;
    /**
     * @description Stores the delegation root node on chain.
     *
     * @param identity the account used to store the delegation root node
     * @returns promise containing the [[TxStatus]]
     */
    store(identity: Identity): Promise<TxStatus>;
    /**
     * @see [[DelegationBaseNode#verify]]
     */
    verify(): Promise<boolean>;
    /**
     * @see [[DelegationBaseNode#revoke]]
     */
    revoke(identity: Identity): Promise<TxStatus>;
    protected decodeChildNode(queryResult: QueryResult): DelegationNode | null;
}
