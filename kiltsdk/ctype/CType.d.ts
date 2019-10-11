/**
 * CTypes are the way the KILT protocol enables a Claimer or Attester or Verifier to create a [[Claim]] schema for creating specific credentials.
 *  ***
 * * A CTYPE is a description of the [[Claim]] data structure, based on [JSON Schema](http://json-schema.org/).
 * * CTYPEs are published and stored by the creator and/or in an open storage registry.
 * * Anyone can use a CTYPE to create a new [[Claim]].
 * @module CType
 * @preferred
 */
import ICType from '../types/CType';
import Identity from '../identity/Identity';
import TxStatus from '../blockchain/TxStatus';
export default class CType implements ICType {
    static fromObject(obj: ICType): CType;
    hash: ICType['hash'];
    owner?: ICType['owner'];
    schema: ICType['schema'];
    metadata: ICType['metadata'];
    constructor(ctype: ICType);
    store(identity: Identity): Promise<TxStatus>;
    verifyClaimStructure(claim: any): boolean;
    getModel(): CType;
    verifyStored(): Promise<boolean>;
}
