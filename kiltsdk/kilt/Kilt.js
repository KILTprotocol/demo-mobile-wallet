"use strict";
/**
 * KILT's core functionalities are exposed via connecting to its blockchain.
 * ***
 * To connect to the blockchain:
 * ```Kilt.connect('ws://localhost:9944');```
 * @module Kilt
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Dummy comment needed for correct doc display, do not remove
 */
const blockchainApiConnection_1 = require("../blockchainApiConnection");
function connect(host) {
    return blockchainApiConnection_1.getCached(host);
}
exports.connect = connect;
exports.default = {
    connect,
};
//# sourceMappingURL=Kilt.js.map