/**
 * @module Delegation/DelegationRootNode
 */
import DelegationRootNode from './DelegationRootNode';
import TxStatus from '../blockchain/TxStatus';
import Identity from '../identity/Identity';
import { IDelegationRootNode } from '../types/Delegation';
export declare function store(delegation: IDelegationRootNode, identity: Identity): Promise<TxStatus>;
export declare function query(delegationId: IDelegationRootNode['id']): Promise<DelegationRootNode | null>;
export declare function revoke(delegation: IDelegationRootNode, identity: Identity): Promise<TxStatus>;
