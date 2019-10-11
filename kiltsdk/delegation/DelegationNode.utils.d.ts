/**
 * @module Delegation/DelegationNode
 */
/**
 * Dummy comment needed for correct doc display, do not remove.
 */
import { IDelegationNode } from '../types/Delegation';
/**
 * Creates a bitset from the permissions in the array where each enum value
 * is used to set the bit flag in the set.
 *
 * ATTEST has `0000000000000001`  (decimal 1)
 * DELEGATE has `0000000000000010` (decimal 2)
 *
 * Adding the enum values results in a decimal representation of the bitset.
 *
 * @returns the bitset as single value uint8 array
 */
export declare function permissionsAsBitset(delegation: IDelegationNode): Uint8Array;
