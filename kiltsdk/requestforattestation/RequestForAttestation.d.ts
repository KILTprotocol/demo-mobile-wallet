/**
 * Requests for attestation are a core building block of the KILT SDK.
 * A RequestForAttestation represents a [[Claim]] which needs to be validated. In practice, the RequestForAttestation is sent from a claimer to an attester.
 *
 * A RequestForAttestation object contains the [[Claim]] and its hash, and legitimations/delegationId of the attester. It's signed by the claimer, to make it tamper proof (`claimerSignature` is a property of [[Claim]]). A RequestForAttestation also supports hiding of claim data during a credential presentation.
 *
 * @module RequestForAttestation
 */
import { IDelegationBaseNode } from '..';
import Identity from '../identity/Identity';
import IClaim from '../claim/Claim';
import AttestedClaim from '../attestedclaim/AttestedClaim';
import IRequestForAttestation, { Hash, NonceHash } from '../types/RequestForAttestation';
export default class RequestForAttestation implements IRequestForAttestation {
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
    static fromObject(obj: IRequestForAttestation): RequestForAttestation;
    claim: IClaim;
    claimOwner: NonceHash;
    claimerSignature: string;
    claimHashTree: object;
    ctypeHash: NonceHash;
    hash: Hash;
    legitimations: AttestedClaim[];
    delegationId?: IDelegationBaseNode['id'];
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
    constructor(claim: IClaim, legitimations: AttestedClaim[], identity: Identity, delegationId?: IDelegationBaseNode['id']);
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
    removeClaimProperties(properties: string[]): void;
    /**
     * Removes the [[Claim]] owner from the [[RequestForAttestation]] object.
     *
     * @example
     * ```javascript
     * requestForAttestation.removeClaimOwner();
     * // `requestForAttestation` does not contain the claim `owner` or the `claimOwner`'s nonce anymore.
     * ```
     */
    removeClaimOwner(): void;
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
    verifyData(): boolean;
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
    verifySignature(): boolean;
    private getHashLeaves;
    private calculateRootHash;
    private sign;
}
