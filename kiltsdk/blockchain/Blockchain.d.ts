/**
 *  Blockchain bridges that connects the SDK and the KILT Blockchain.
 *  ***
 *  Communicates with the chain via WebSockets and can [[listenToBlocks]]. It exposes the [[submitTx]] function that performs a transaction.
 * @module Blockchain
 * @preferred
 */
/**
 * Dummy comment needed for correct doc display, do not remove
 */
import { ApiPromise } from '@polkadot/api';
import { CodecResult, SubscriptionResult } from '@polkadot/api/promise/types';
import { SubmittableExtrinsic } from '@polkadot/api/SubmittableExtrinsic';
import { Header } from '@polkadot/types';
import { Codec } from '@polkadot/types/types';
import Identity from '../identity/Identity';
import TxStatus from './TxStatus';
export declare type QueryResult = Codec | undefined | null;
export declare type Stats = {
    chain: Codec;
    nodeName: Codec;
    nodeVersion: Codec;
};
export interface IBlockchainApi {
    api: ApiPromise;
    getStats(): Promise<Stats>;
    listenToBlocks(listener: (header: Header) => void): Promise<any>;
    submitTx(identity: Identity, tx: SubmittableExtrinsic<CodecResult, SubscriptionResult>): Promise<TxStatus>;
    getNonce(accountAddress: string): Promise<Codec>;
}
export default class Blockchain implements IBlockchainApi {
    static asArray(queryResult: QueryResult): any[];
    api: ApiPromise;
    constructor(api: ApiPromise);
    private errorHandler;
    getStats(): Promise<Stats>;
    listenToBlocks(listener: (header: Header) => void): Promise<() => void>;
    submitTx(identity: Identity, tx: SubmittableExtrinsic<CodecResult, SubscriptionResult>): Promise<TxStatus>;
    getNonce(accountAddress: string): Promise<Codec>;
}
