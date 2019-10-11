"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const bn_js_1 = tslib_1.__importDefault(require("bn.js/"));
const Identity_1 = tslib_1.__importDefault(require("../identity/Identity"));
// import partial from 'lodash/partial'
const Balance_chain_1 = require("./Balance.chain");
jest.mock('../blockchainApiConnection/BlockchainApiConnection');
describe('Balance', async () => {
    const blockchain = require('../blockchain/Blockchain').default;
    blockchain.api.query.balances.freeBalance = jest.fn((accountAddress, cb) => {
        if (cb) {
            setTimeout(() => {
                cb(new bn_js_1.default(42));
            }, 1);
        }
        return new bn_js_1.default(12);
    });
    it('should listen to balance changes', async (done) => {
        const bob = Identity_1.default.buildFromURI('//Bob');
        const listener = (account, balance, change) => {
            expect(account).toBe(bob.address);
            expect(balance.toNumber()).toBe(42);
            expect(change.toNumber()).toBe(30);
            done();
        };
        const currentBalance = await Balance_chain_1.listenToBalanceChanges(bob.address, listener);
        expect(currentBalance.toString()).toBeTruthy();
        expect(currentBalance.toString()).toEqual('12');
    });
    blockchain.__mockResultHash = '123';
    it('should make transfer', async () => {
        const alice = Identity_1.default.buildFromURI('//Alice');
        const bob = Identity_1.default.buildFromURI('//Bob');
        const hash = await Balance_chain_1.makeTransfer(alice, bob.address, new bn_js_1.default(100));
        expect(hash).toBe('123');
    });
});
//# sourceMappingURL=Balance.spec.js.map