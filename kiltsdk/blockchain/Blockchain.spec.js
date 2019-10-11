"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blockchainApiConnection_1 = require("../blockchainApiConnection");
describe('Blockchain', async () => {
    xit('should get stats', async () => {
        const blockchainSingleton = await blockchainApiConnection_1.getCached();
        const stats = await blockchainSingleton.getStats();
        expect(stats).toEqual({
            chain: 'KILT Testnet',
            nodeName: 'substrate-node',
            nodeVersion: '0.9.0',
        });
    });
    xit('should listen to blocks', async (done) => {
        const listener = (header) => {
            console.log(`Best block number ${header.blockNumber}`);
            done();
        };
        const blockchainSingleton = await blockchainApiConnection_1.getCached();
        const subscriptionId = await blockchainSingleton.listenToBlocks(listener);
        expect(subscriptionId).toBeGreaterThanOrEqual(0);
        console.log(`Subscription Id: ${subscriptionId}`);
    }, 20000);
});
//# sourceMappingURL=Blockchain.spec.js.map