/**
 * In KILT, the AttestedClaim is a **credential**, which a Claimer can store locally and share with Verifiers as they wish.
 *
 * Once a [[RequestForAttestation]] has been made, the [[Attestation]] can be built and the Attester submits it wrapped in an [[AttestedClaim]] object. This [[AttestedClaim]] also contains the original request for attestation. RequestForAttestation also exposes a [[createPresentation]] method, that can be used by the claimer to hide some specific information from the verifier for more privacy.
 *
 * @module AttestedClaim
 * @preferred
 */
import Attestation from '../attestation/Attestation';
import RequestForAttestation from '../requestforattestation/RequestForAttestation';
import IAttestedClaim from '../types/AttestedClaim';
import IAttestation from '../types/Attestation';
import IRequestForAttestation from '../types/RequestForAttestation';
export default class AttestedClaim implements IAttestedClaim {
    /**
     * [STATIC] Builds an instance of [[AttestedClaim]], from a simple object with the same properties.
     * Used for deserialization.
     *
     * @param obj - The base object from which to create the attested claim.
     * @returns A new [[AttestedClaim]] object.
     * @example
     * ```javascript
     * // create an AttestedClaim object, so we can call methods on it (`serialized` is a serialized AttestedClaim object)
     * AttestedClaim.fromObject(JSON.parse(serialized));
     * ```
     */
    static fromObject(obj: IAttestedClaim): AttestedClaim;
    request: RequestForAttestation;
    attestation: Attestation;
    /**
     * Builds a new [[AttestedClaim]] instance.
     *
     * @param request - A request for attestation, usually sent by a claimer.
     * @param attestation - The attestation to base the [[AttestedClaim]] on.
     * @example Create an [[AttestedClaim]] upon successful [[Attestation]] creation:
     * ```javascript
     * new AttestedClaim(requestForAttestation, attestation);
     * ```
     */
    constructor(request: IRequestForAttestation, attestation: IAttestation);
    /**
     * (ASYNC) Verifies whether this attested claim is valid. It is valid if:
     * * the data is valid (see [[verifyData]]);
     * and
     * * the [[Attestation]] object for this attestated claim is valid (see [[Attestation.verify]], where the **chain** is queried).
     *
     * Upon presentation of an attested claim, a verifier would call this [[verify]] function.
     *
     * @returns A promise containing whether this attested claim is valid.
     * @example
     * ```javascript
     * attestedClaim.verify().then(isVerified => {
     *   // `isVerified` is true if the attestation is verified, false otherwise
     * });
     * ```
     */
    verify(): Promise<boolean>;
    /**
     * Verifies whether the data of this attested claim is valid. It is valid if:
     * * the [[RequestForAttestation]] object associated with this attested claim has valid data (see [[RequestForAttestation.verifyData]]);
     * and
     * * the hash of the [[RequestForAttestation]] object for this attested claim, and the hash of the [[Claim]] for this attestated claim are the same.
     *
     * @returns Whether the attestated claim's data is valid.
     * @example
     * ```javascript
     * attestedClaim.verifyData();
     * ```
     */
    verifyData(): boolean;
    /**
     * Gets the hash of the claim that corresponds to this attestation.
     *
     * @returns The hash of the claim for this attestation (claimHash).
     * @example
     * ```javascript
     * attestation.getHash();
     * ```
     */
    getHash(): string;
    /**
     * Builds a presentation. A presentation is a custom view of the [[AttestedClaim]], in which the claimer controls what information should be shown.
     *
     * @param excludedClaimProperties - An array of [[Claim]] properties to **exclude**.
     * @param excludeIdentity - Whether the claimer's identity should be **excluded** from the presentation. By default, the claimer's identity is included (`excludeIdentity` is `false`).
     * @returns The newly created presentation.
     * @example
     * ```javascript
     * // create a presentation that keeps `birthYear` and `identity` private
     * createPresentation(['birthYear'], true);
     * ```
     */
    createPresentation(excludedClaimProperties: string[], excludeIdentity?: boolean): AttestedClaim;
}
