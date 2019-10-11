"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const types_1 = require("@polkadot/types");
const Bool_1 = tslib_1.__importDefault(require("@polkadot/types/primitive/Bool"));
const U32_1 = tslib_1.__importDefault(require("@polkadot/types/primitive/U32"));
const __1 = require("..");
const DelegationNode_1 = tslib_1.__importDefault(require("./DelegationNode"));
const Delegation_chain_1 = require("./Delegation.chain");
const Delegation_1 = require("../types/Delegation");
jest.mock('../blockchainApiConnection/BlockchainApiConnection');
describe('Delegation', () => {
    const identityAlice = __1.Identity.buildFromURI('//Alice');
    const ctypeHash = __1.Crypto.hashStr('testCtype');
    const blockchain = require('../blockchain/Blockchain').default;
    blockchain.api.tx.delegation.createRoot = jest.fn(() => {
        return Promise.resolve();
    });
    blockchain.api.query.attestation.delegatedAttestations = jest.fn(() => {
        const tuple = new types_1.Tuple(
        //  (claim-hash)
        [types_1.Text, types_1.Text, types_1.Text], ['0x123', '0x456', '0x789']);
        return Promise.resolve(tuple);
    });
    blockchain.api.query.delegation.root = jest.fn(() => {
        const tuple = new types_1.Tuple(
        // Root-Delegation: root-id -> (ctype-hash, account, revoked)
        [types_1.Tuple.with([types_1.Text, types_1.Text, Bool_1.default])], [[ctypeHash, identityAlice.address, false]]);
        return Promise.resolve(tuple);
    });
    blockchain.api.query.delegation.delegations = jest.fn(delegationId => {
        let result = null;
        if (delegationId === 'firstChild') {
            result = new types_1.Tuple(
            // Delegation: delegation-id -> (root-id, parent-id?, account, permissions, revoked)
            [types_1.Text, types_1.Text, types_1.Text, U32_1.default, Bool_1.default], [
                'rootId',
                'myNodeId',
                identityAlice.getPublicIdentity().address,
                2,
                false,
            ]);
        }
        else if (delegationId === 'secondChild') {
            result = new types_1.Tuple(
            // Delegation: delegation-id -> (root-id, parent-id?, account, permissions, revoked)
            [types_1.Text, types_1.Text, types_1.Text, U32_1.default, Bool_1.default], [
                'rootId',
                'myNodeId',
                identityAlice.getPublicIdentity().address,
                1,
                false,
            ]);
        }
        else if (delegationId === 'thirdChild') {
            result = new types_1.Tuple(
            // Delegation: delegation-id -> (root-id, parent-id?, account, permissions, revoked)
            [types_1.Text, types_1.Text, types_1.Text, U32_1.default, Bool_1.default], [
                'rootId',
                'myNodeId',
                identityAlice.getPublicIdentity().address,
                0,
                false,
            ]);
        }
        return Promise.resolve(result);
    });
    blockchain.api.query.delegation.children = jest.fn(() => {
        const tuple = new types_1.Tuple(
        // Children: delegation-id -> [delegation-ids]
        [types_1.Text, types_1.Text, types_1.Text], ['firstChild', 'secondChild', 'thirdChild']);
        return Promise.resolve(tuple);
    });
    it('get children', async () => {
        const myDelegation = new DelegationNode_1.default('myNodeId', 'rootId', identityAlice.getPublicIdentity().address, [Delegation_1.Permission.ATTEST], undefined);
        const children = await myDelegation.getChildren();
        expect(children).toHaveLength(3);
        expect(children[0]).toEqual({
            id: 'firstChild',
            rootId: 'rootId',
            parentId: 'myNodeId',
            account: identityAlice.getPublicIdentity().address,
            permissions: [Delegation_1.Permission.DELEGATE],
            revoked: false,
        });
        expect(children[1]).toEqual({
            id: 'secondChild',
            rootId: 'rootId',
            parentId: 'myNodeId',
            account: identityAlice.getPublicIdentity().address,
            permissions: [Delegation_1.Permission.ATTEST],
            revoked: false,
        });
        expect(children[2]).toEqual({
            id: 'thirdChild',
            rootId: 'rootId',
            parentId: 'myNodeId',
            account: identityAlice.getPublicIdentity().address,
            permissions: [],
            revoked: false,
        });
    });
    it('get attestation hashes', async () => {
        const attestationHashes = await Delegation_chain_1.getAttestationHashes('myDelegationId');
        expect(attestationHashes).toHaveLength(3);
        expect(attestationHashes).toContain('0x123');
    });
});
//# sourceMappingURL=Delegation.spec.js.map