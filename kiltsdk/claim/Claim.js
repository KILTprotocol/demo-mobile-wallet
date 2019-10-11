"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const CTypeUtils_1 = require("../ctype/CTypeUtils");
function verifyClaim(claimContents, cType) {
    return CTypeUtils_1.verifyClaimStructure(claimContents, cType.schema);
}
class Claim {
    static fromObject(obj) {
        const newClaim = Object.create(Claim.prototype);
        return Object.assign(newClaim, obj);
    }
    constructor(cType, contents, identity) {
        if (!verifyClaim(contents, cType)) {
            throw Error('Claim not valid');
        }
        this.cType = cType.hash;
        this.contents = contents;
        this.owner = identity.address;
    }
}
exports.default = Claim;
//# sourceMappingURL=Claim.js.map