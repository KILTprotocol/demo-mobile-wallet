"use strict";
/**
 * CTypes are the way the KILT protocol enables a Claimer or Attester or Verifier to create a [[Claim]] schema for creating specific credentials.
 *  ***
 * * A CTYPE is a description of the [[Claim]] data structure, based on [JSON Schema](http://json-schema.org/).
 * * CTYPEs are published and stored by the creator and/or in an open storage registry.
 * * Anyone can use a CTYPE to create a new [[Claim]].
 * @module CType
 * @preferred
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/**
 * Dummy comment needed for correct doc display, do not remove
 */
const CTypeSchema_1 = require("./CTypeSchema");
const CTypeUtils = tslib_1.__importStar(require("./CTypeUtils"));
const CType_chain_1 = require("./CType.chain");
class CType {
    static fromObject(obj) {
        const newObject = Object.create(CType.prototype);
        return Object.assign(newObject, obj);
    }
    constructor(ctype) {
        if (!CTypeUtils.verifySchema(ctype, CTypeSchema_1.CTypeWrapperModel)) {
            throw new Error('CType does not correspond to schema');
        }
        this.schema = ctype.schema;
        this.metadata = ctype.metadata;
        this.owner = ctype.owner;
        this.hash = CTypeUtils.getHashForSchema(this.schema);
        if (ctype.hash && this.hash !== ctype.hash) {
            throw Error('provided and generated cType hash are not the same');
        }
    }
    async store(identity) {
        return CType_chain_1.store(this, identity);
    }
    verifyClaimStructure(claim) {
        return CTypeUtils.verifySchema(claim, this.schema);
    }
    getModel() {
        return this;
    }
    async verifyStored() {
        return (await CType_chain_1.getOwner(this.hash)) === this.owner;
    }
}
exports.default = CType;
//# sourceMappingURL=CType.js.map