/**
 * @module Delegation/DelegationNode
 */
import DelegationNode from './DelegationNode';
import TxStatus from '../blockchain/TxStatus';
import Identity from '../identity/Identity';
import { IDelegationNode } from '../types/Delegation';
export declare function store(delegation: IDelegationNode, identity: Identity, signature: string): Promise<TxStatus>;
export declare function query(delegationId: IDelegationNode['id']): Promise<DelegationNode | null>;
export declare function revoke(delegationId: IDelegationNode['id'], identity: Identity): Promise<TxStatus>;
