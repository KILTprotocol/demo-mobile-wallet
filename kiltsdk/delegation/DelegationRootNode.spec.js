"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const types_1 = require("@polkadot/types");
const Bool_1 = tslib_1.__importDefault(require("@polkadot/types/primitive/Bool"));
const __1 = require("..");
const DelegationRootNode_1 = tslib_1.__importDefault(require("./DelegationRootNode"));
jest.mock('../blockchainApiConnection/BlockchainApiConnection');
describe('Delegation', () => {
    const identityAlice = __1.Identity.buildFromURI('//Alice');
    const ctypeHash = __1.Crypto.hashStr('testCtype');
    require('../blockchain/Blockchain').default.__mockQueryDelegationRoot = jest.fn(() => {
        const tuple = new types_1.Tuple(
        // Root-Delegation: root-id -> (ctype-hash, account, revoked)
        [types_1.Text, types_1.Text, Bool_1.default], [ctypeHash, identityAlice.address, false]);
        return Promise.resolve(tuple);
    });
    require('../blockchain/Blockchain').default.__mockQueryDelegationDelegation = jest.fn(() => {
        const tuple = new types_1.Tuple(
        // Root-Delegation: delegation-id -> (root-id, parent-id?, account, permissions, revoked)
        [types_1.Text, types_1.Text, Bool_1.default], [ctypeHash, identityAlice.address, false]);
        return Promise.resolve(tuple);
    });
    const ROOT_IDENTIFIER = 'abc123';
    it('stores root delegation', async () => {
        const rootDelegation = new DelegationRootNode_1.default(ROOT_IDENTIFIER, ctypeHash, identityAlice.getPublicIdentity().address);
        rootDelegation.store(identityAlice);
        const rootNode = await DelegationRootNode_1.default.query(ROOT_IDENTIFIER);
        if (rootNode) {
            expect(rootNode.id).toBe(ROOT_IDENTIFIER);
        }
    });
    it('query root delegation', async () => {
        // @ts-ignore
        const queriedDelegation = await DelegationRootNode_1.default.query(ROOT_IDENTIFIER);
        expect(queriedDelegation).not.toBe(undefined);
        if (queriedDelegation) {
            expect(queriedDelegation.account).toBe(identityAlice.address);
            expect(queriedDelegation.cTypeHash).toBe(ctypeHash);
            expect(queriedDelegation.id).toBe(ROOT_IDENTIFIER);
        }
    });
    it('root delegation verify', async () => {
        require('../blockchain/Blockchain').default.__mockQueryDelegationRoot = jest.fn(rootId => {
            if (rootId === 'success') {
                const tuple = new types_1.Tuple(
                // Root-Delegation: root-id -> (ctype-hash, account, revoked)
                [types_1.Text, types_1.Text, Bool_1.default], ['myCtypeHash', 'myAccount', false]);
                return Promise.resolve(tuple);
            }
            const tuple = new types_1.Tuple(
            // Root-Delegation: root-id -> (ctype-hash, account, revoked)
            [types_1.Text, types_1.Text, Bool_1.default], ['myCtypeHash', 'myAccount', true]);
            return Promise.resolve(tuple);
        });
        expect(await new DelegationRootNode_1.default('success', 'myCtypeHash', 'myAccount').verify()).toBe(true);
        expect(await new DelegationRootNode_1.default('failure', 'myCtypeHash', 'myAccount').verify()).toBe(false);
    });
    it('root delegation verify', async () => {
        let calledRootId = '';
        require('../blockchain/Blockchain').default.__mockTxDelegationRoot = jest.fn(rootId => {
            calledRootId = rootId;
        });
        const aDelegationRootNode = new DelegationRootNode_1.default('myRootId', 'myCtypeHash', 'myAccount');
        const revokeStatus = await aDelegationRootNode.revoke(identityAlice);
        expect(calledRootId).toBe('myRootId');
        expect(revokeStatus).toBeDefined();
    });
});
//# sourceMappingURL=DelegationRootNode.spec.js.map