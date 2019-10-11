/**
 * @module Delegation
 */
import { CodecWithId } from './DelegationDecoder';
import { IDelegationBaseNode } from '../types/Delegation';
export declare function getAttestationHashes(id: IDelegationBaseNode['id']): Promise<string[]>;
export declare function getChildIds(id: IDelegationBaseNode['id']): Promise<string[]>;
export declare function fetchChildren(childIds: string[]): Promise<CodecWithId[]>;
