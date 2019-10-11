/**
 * @module DID
 */
import IPublicIdentity from '../types/PublicIdentity';
import { QueryResult } from '../blockchain/Blockchain';
import { IDid } from './Did';
export declare function decodeDid(identifier: string, encoded: QueryResult): IDid | null;
export declare function getIdentifierFromAddress(address: IPublicIdentity['address']): IDid['identifier'];
export declare function getAddressFromIdentifier(identifier: IDid['identifier']): IPublicIdentity['address'];
