/**
 * When [[DelegationNode]]s or [[DelegationRootNode]]s are written on the blockchain, they're encoded.
 * DelegationDecoder helps to decode them when they're queried from the chain.
 * ***
 * The DelegationDecoder methods transform a [[QueryResult]] into an object of a KILT type.
 * @module Delegation/DelegationDecoder
 * @preferred
 */
/**
 * Dummy comment needed for correct doc display, do not remove
 */
import { QueryResult } from '../blockchain/Blockchain';
import DelegationNode from './DelegationNode';
import DelegationRootNode from './DelegationRootNode';
export declare type CodecWithId = {
    id: string;
    codec: QueryResult;
};
export declare function decodeRootDelegation(encoded: QueryResult): DelegationRootNode | null;
export declare function decodeDelegationNode(encoded: QueryResult): DelegationNode | null;
