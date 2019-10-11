/**
 * @module CType
 */
import TxStatus from '../blockchain/TxStatus';
import Identity from '../identity/Identity';
import IPublicIdentity from '../types/PublicIdentity';
import ICType from '../types/CType';
export declare function store(ctype: ICType, identity: Identity): Promise<TxStatus>;
export declare function getOwner(ctypeHash: ICType['hash']): Promise<IPublicIdentity['address'] | null>;
