/**
 * KILT's core functionalities are exposed via connecting to its blockchain.
 * ***
 * To connect to the blockchain:
 * ```Kilt.connect('ws://localhost:9944');```
 * @module Kilt
 */
import { IBlockchainApi } from '../blockchain/Blockchain';
export declare function connect(host: string): Promise<IBlockchainApi>;
declare const _default: {
    connect: typeof connect;
};
export default _default;
