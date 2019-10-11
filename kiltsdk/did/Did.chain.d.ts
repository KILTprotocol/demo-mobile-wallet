/**
 * @module DID
 */
import { IDid } from './Did';
import Identity from '../identity/Identity';
import TxStatus from '../blockchain/TxStatus';
import IPublicIdentity from '../types/PublicIdentity';
export declare function queryByIdentifier(identifier: IDid['identifier']): Promise<IDid | null>;
export declare function queryByAddress(address: IPublicIdentity['address']): Promise<IDid | null>;
export declare function remove(identity: Identity): Promise<TxStatus>;
export declare function store(did: IDid, identity: Identity): Promise<TxStatus>;
