"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const types_1 = require("@polkadot/types");
const Bool_1 = tslib_1.__importDefault(require("@polkadot/types/primitive/Bool"));
const U32_1 = tslib_1.__importDefault(require("@polkadot/types/primitive/U32"));
const Identity_1 = tslib_1.__importDefault(require("../identity/Identity"));
const DelegationNode_1 = tslib_1.__importDefault(require("./DelegationNode"));
const Delegation_1 = require("../types/Delegation");
const DelegationNode_utils_1 = require("./DelegationNode.utils");
jest.mock('../blockchainApiConnection/BlockchainApiConnection');
describe('Delegation', () => {
    it('delegation generate hash', () => {
        const node = new DelegationNode_1.default('0x0000000000000000000000000000000000000000000000000000000000000001', '0x0000000000000000000000000000000000000000000000000000000000000002', 'myAccount', [Delegation_1.Permission.ATTEST], '0x0000000000000000000000000000000000000000000000000000000000000003');
        const hash = node.generateHash();
        console.log('hash', hash);
        expect(hash).toBe('0x20c5b0ba186b1eef2eabdb10a5e6399cc8eaa865ad0aaed6d3583c97746392aa');
    });
    it('delegation permissionsAsBitset', () => {
        const node = new DelegationNode_1.default('myId', 'myRootId', 'myAccount', [Delegation_1.Permission.ATTEST, Delegation_1.Permission.DELEGATE], 'myParentNodeId');
        // @ts-ignore
        const permissions = DelegationNode_utils_1.permissionsAsBitset(node);
        console.log('permissions', permissions);
        const expected = new Uint8Array(4);
        expected[0] = 3;
        expect(permissions.toString()).toBe(expected.toString());
    });
    it('delegation verify / revoke', async () => {
        require('../blockchain/Blockchain').default.__mockQueryDelegationDelegations = jest.fn(id => {
            if (id === 'success') {
                const tuple = new types_1.Tuple(
                // (root-id, parent-id?, account, permissions, revoked)
                [types_1.Text, types_1.Option, types_1.Text, U32_1.default, Bool_1.default], ['myRootId', null, 'myAccount', 1, false]);
                return Promise.resolve(tuple);
            }
            const tuple = new types_1.Tuple(
            // (root-id, parent-id?, account, permissions, revoked)
            [types_1.Text, types_1.Option, types_1.Text, U32_1.default, Bool_1.default], ['myRootId', null, 'myAccount', 1, true]);
            return Promise.resolve(tuple);
        });
        expect(await new DelegationNode_1.default('success', 'myRootId', 'myAccount', []).verify()).toBe(true);
        expect(await new DelegationNode_1.default('failure', 'myRootId', 'myAccount', []).verify()).toBe(false);
        const identityAlice = Identity_1.default.buildFromURI('//Alice');
        const aDelegationNode = new DelegationNode_1.default('myDelegationNode', 'myRootId', 'myAccount', []);
        const revokeStatus = await aDelegationNode.revoke(identityAlice);
        expect(revokeStatus).toBeDefined();
    });
    it('get delegation root', async () => {
        const identityAlice = Identity_1.default.buildFromURI('//Alice');
        require('../blockchain/Blockchain').default.__mockQueryDelegationRoot = jest.fn(() => {
            const tuple = new types_1.Tuple(
            // Root-Delegation: root-id -> (ctype-hash, account, revoked)
            [types_1.Text, types_1.Text, Bool_1.default], ['0x1234', identityAlice.address, false]);
            return Promise.resolve(tuple);
        });
        const node = new DelegationNode_1.default('nodeId', 'rootNodeId', identityAlice.address, []);
        const rootNode = await node.getRoot();
        expect(rootNode).toBeDefined();
        expect(rootNode.cTypeHash).toBe('0x1234');
    });
});
//# sourceMappingURL=DelegationNode.spec.js.map