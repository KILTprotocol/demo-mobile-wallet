"use strict";
/**
 * @module Delegation/DelegationNode
 */
Object.defineProperty(exports, "__esModule", { value: true });
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
// eslint-disable-next-line import/prefer-default-export
function permissionsAsBitset(delegation) {
    const permisssionsAsBitset = delegation.permissions.reduce((accumulator, currentValue) => accumulator + currentValue);
    const uint8 = new Uint8Array(4);
    uint8[0] = permisssionsAsBitset;
    return uint8;
}
exports.permissionsAsBitset = permissionsAsBitset;
//# sourceMappingURL=DelegationNode.utils.js.map