"use strict";
/**
 * @module BlockchainApiConnection
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/**
 * Dummy comment needed for correct doc display, do not remove
 */
const Blockchain_1 = tslib_1.__importDefault(require("../../blockchain/Blockchain"));
jest.mock('../../blockchain/Blockchain');
async function getCached() {
    return Promise.resolve(Blockchain_1.default);
}
exports.getCached = getCached;
exports.default = getCached;
//# sourceMappingURL=BlockchainApiConnection.js.map