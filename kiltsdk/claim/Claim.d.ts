/**
 * Claims are a core building block of the KILT SDK. A claim represents **something an entity claims about itself**. Once created, a claim can be used to create a [[RequestForAttestation]].
 * ***
 * A claim object has:
 * * contents - among others, the pure content of a claim, for example `"isOver18": yes`;
 * * a [[CType]] that represents its data structure.
 * <br><br>
 * A claim object's owner is (should be) the same entity as the claimer.
 * @module Claim
 * @preferred
 */
/**
 * Dummy comment needed for correct doc display, do not remove
 */
import CType from '../ctype/CType';
import Identity from '../identity/Identity';
import IClaim from '../types/Claim';
export default class Claim implements IClaim {
    static fromObject(obj: IClaim): Claim;
    cType: IClaim['cType'];
    contents: IClaim['contents'];
    owner: IClaim['owner'];
    constructor(cType: CType, contents: IClaim['contents'], identity: Identity);
}
