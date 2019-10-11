"use strict";
/**
 * Requests for attestation are a core building block of the KILT SDK.
 * A RequestForAttestation represents a [[Claim]] which needs to be validated. In practice, the RequestForAttestation is sent from a claimer to an attester.
 *
 * A RequestForAttestation object contains the [[Claim]] and its hash, and legitimations/delegationId of the attester. It's signed by the claimer, to make it tamper proof (`claimerSignature` is a property of [[Claim]]). A RequestForAttestation also supports hiding of claim data during a credential presentation.
 *
 * @module RequestForAttestation
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/**
 * Dummy comment needed for correct doc display, do not remove.
 */
const uuid_1 = require("uuid");
const Crypto_1 = require("../crypto/Crypto");
const AttestedClaim_1 = tslib_1.__importDefault(require("../attestedclaim/AttestedClaim"));
function hashNonceValue(nonce, value) {
    return Crypto_1.hashObjectAsStr(value, nonce);
}
function generateHash(value) {
    const nonce = uuid_1.v4();
    return {
        nonce,
        hash: hashNonceValue(nonce, value),
    };
}
function generateHashTree(contents) {
    const result = {};
    Object.keys(contents).forEach(key => {
        result[key] = generateHash(contents[key]);
    });
    return result;
}
function verifyClaimerSignature(rfa) {
    return Crypto_1.verify(rfa.hash, rfa.claimerSignature, rfa.claim.owner);
}
function getHashRoot(leaves) {
    const result = Crypto_1.u8aConcat(...leaves);
    return Crypto_1.hash(result);
}
class RequestForAttestation {
    /**
     * [STATIC] Builds an instance of [[RequestForAttestation]], from a simple object with the same properties.
     * Used for deserialization.
     *
     * @param obj - An object built from simple [[Claim]], [[Identity]] and legitimation objects.
     * @returns  A new [[RequestForAttestation]] `object`.
     * @example
     * ```javascript
     * // create an RequestForAttestation object, so we can call methods on it (`serialized` is a serialized RequestForAttestation object)
     * RequestForAttestation.fromObject(JSON.parse(serialized));
     * ```
     */
    static fromObject(obj) {
        const newClaim = Object.create(RequestForAttestation.prototype);
        const object = Object.assign(newClaim, obj);
        object.legitimations = object.legitimations.map((legitimation) => AttestedClaim_1.default.fromObject(legitimation));
        return object;
    }
    /**
     * Builds a new [[RequestForAttestation]] instance.
     *
     * @param claim - A claim, usually sent by a claimer.
     * @param legitimations - Attested claims used as legitimations.
     * @param identity - Identity of the claimer.
     * @param delegationId - A delegation tree's root node id.
     * @example
     * ```javascript
     * // create a new request for attestation
     * new RequestForAttestation(claim, [], alice);
     * ```
     */
    constructor(claim, legitimations, identity, delegationId) {
        if (claim.owner !== identity.address) {
            throw Error('Claim owner is not identity');
        }
        this.claim = claim;
        this.claimOwner = generateHash(this.claim.owner);
        this.ctypeHash = generateHash(this.claim.cType);
        this.legitimations = legitimations;
        this.delegationId = delegationId;
        this.claimHashTree = generateHashTree(claim.contents);
        this.hash = this.calculateRootHash();
        this.claimerSignature = this.sign(identity);
    }
    /**
     * Removes [[Claim]] properties from the [[RequestForAttestation]] object, provides anonymity and security when building the [[createPresentation]] method.
     *
     * @param properties - Properties to remove from the [[Claim]] object.
     * @throws An error when a property which should be deleted wasn't found.
     * @example
     * ```javascript
     *  requestForAttestation.removeClaimProperties(['name']);
     * // `name` is deleted from `requestForAttestation`
     * ```
     */
    removeClaimProperties(properties) {
        properties.forEach(key => {
            if (!this.claimHashTree[key]) {
                throw Error(`Property '${key}' not found in claim`);
            }
            delete this.claim.contents[key];
            delete this.claimHashTree[key].nonce;
        });
    }
    /**
     * Removes the [[Claim]] owner from the [[RequestForAttestation]] object.
     *
     * @example
     * ```javascript
     * requestForAttestation.removeClaimOwner();
     * // `requestForAttestation` does not contain the claim `owner` or the `claimOwner`'s nonce anymore.
     * ```
     */
    removeClaimOwner() {
        delete this.claim.owner;
        delete this.claimOwner.nonce;
    }
    /**
     * Verifies the data of the [[RequestForAttestation]] object; used to check that the data was not tampered with, by checking the data against hashes.
     *
     * @returns Whether the data is valid.
     * @example
     * ```javascript
     *  requestForAttestation.verifyData();
     * // returns `true` if the data is correct
     * ```
     */
    verifyData() {
        // check claim hash
        if (this.hash !== this.calculateRootHash()) {
            return false;
        }
        // check claim owner hash
        if (this.claim.owner) {
            if (this.claimOwner.hash !==
                hashNonceValue(this.claimOwner.nonce, this.claim.owner)) {
                throw Error('Invalid hash for claim owner');
            }
        }
        // check cType hash
        if (this.ctypeHash.hash !==
            hashNonceValue(this.ctypeHash.nonce, this.claim.cType)) {
            throw Error('Invalid hash for CTYPE');
        }
        // check all hashes for provided claim properties
        Object.keys(this.claim.contents).forEach(key => {
            const value = this.claim.contents[key];
            if (!this.claimHashTree[key]) {
                throw Error(`Property '${key}' not in claim hash tree`);
            }
            const hashed = this.claimHashTree[key];
            if (hashed.hash !== hashNonceValue(hashed.nonce, value)) {
                throw Error(`Invalid hash for property '${key}' in claim hash tree`);
            }
        });
        // check legitimations
        let valid = true;
        if (this.legitimations) {
            this.legitimations.forEach(legitimation => {
                valid = valid && legitimation.verifyData();
            });
        }
        if (!valid) {
            return false;
        }
        // check signature
        return this.verifySignature();
    }
    /**
     * Verifies the signature of the [[RequestForAttestation]] object.
     *
     * @returns Whether the signature is correct.
     * @example
     * ```javascript
     * requestForAttestation.verifySignature();
     * // returns `true` if the signature is correct
     * ```
     */
    verifySignature() {
        return verifyClaimerSignature(this);
    }
    getHashLeaves() {
        const result = [];
        result.push(Crypto_1.coToUInt8(this.claimOwner.hash));
        result.push(Crypto_1.coToUInt8(this.ctypeHash.hash));
        Object.keys(this.claimHashTree).forEach(key => {
            result.push(Crypto_1.coToUInt8(this.claimHashTree[key].hash));
        });
        if (this.legitimations) {
            this.legitimations.forEach(legitimation => {
                result.push(Crypto_1.coToUInt8(legitimation.getHash()));
            });
        }
        if (this.delegationId) {
            result.push(Crypto_1.coToUInt8(this.delegationId));
        }
        return result;
    }
    calculateRootHash() {
        const hashes = this.getHashLeaves();
        const root = hashes.length === 1 ? hashes[0] : getHashRoot(hashes);
        return Crypto_1.u8aToHex(root);
    }
    sign(identity) {
        return identity.signStr(this.hash);
    }
}
exports.default = RequestForAttestation;
//# sourceMappingURL=RequestForAttestation.js.map