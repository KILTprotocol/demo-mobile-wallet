/**
 * Blockchain Api Connection enables the building and accessing of the KILT [[Blockchain]] connection. In which it keeps one connection open and allows to reuse the connection for all [[Blockchain]] related tasks.
 * ***
 * Other modules can access the [[Blockchain]] as such: `const blockchain = await getCached()`.
 * @module BlockchainApiConnection
 * @preferred
 */
import { IBlockchainApi } from '../blockchain/Blockchain';
export declare const DEFAULT_WS_ADDRESS = "ws://127.0.0.1:9944";
export declare function buildConnection(host?: string): Promise<IBlockchainApi>;
export declare function getCached(host?: string): Promise<IBlockchainApi>;
export default getCached;
