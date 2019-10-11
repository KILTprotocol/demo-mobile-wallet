"use strict";
/**
 * Blockchain Api Connection enables the building and accessing of the KILT [[Blockchain]] connection. In which it keeps one connection open and allows to reuse the connection for all [[Blockchain]] related tasks.
 * ***
 * Other modules can access the [[Blockchain]] as such: `const blockchain = await getCached()`.
 * @module BlockchainApiConnection
 * @preferred
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/**
 * Dummy comment needed for correct doc display, do not remove
 */
const api_1 = require("@polkadot/api");
const Blockchain_1 = tslib_1.__importDefault(require("../blockchain/Blockchain"));
exports.DEFAULT_WS_ADDRESS = 'ws://127.0.0.1:9944';
let instance;
const CUSTOM_TYPES = {
    DelegationNodeId: 'Hash',
    PublicSigningKey: 'Hash',
    PublicBoxKey: 'Hash',
    Permissions: 'u32',
    ErrorCode: 'u16',
};
async function buildConnection(host = exports.DEFAULT_WS_ADDRESS) {
    const provider = new api_1.WsProvider(host);
    const api = await api_1.ApiPromise.create({
        provider,
        types: CUSTOM_TYPES,
    });
    return new Blockchain_1.default(api);
}
exports.buildConnection = buildConnection;
async function getCached(host = exports.DEFAULT_WS_ADDRESS) {
    if (!instance) {
        instance = buildConnection(host);
    }
    return instance;
}
exports.getCached = getCached;
exports.default = getCached;
//# sourceMappingURL=BlockchainApiConnection.js.map