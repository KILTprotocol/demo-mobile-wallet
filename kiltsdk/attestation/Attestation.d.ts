/**
 * An [[Attestation]] certifies a [[Claim]], sent by a claimer in the form of a [[RequestForAttestation]]. [[Attestation]]s are **written on the blockchain** and are **revokable**.
 * Note: once an [[Attestation]] is stored, it can be sent to and stored with the claimer as an [[AttestedClaim]] ("Credential").
 *
 * An [[Attestation]] can be queried from the chain. It's stored on-chain in a map:
 * * the key is the hash of the corresponding claim;
 * * the value is a tuple ([[CType]] hash, account, id of the [[Delegation]], and revoked flag).
 *
 * @module Attestation
 * @preferred
 */
/**
 * Dummy comment needed for correct doc display, do not remove.
 */
import TxStatus from '../blockchain/TxStatus';
import Identity from '../identity/Identity';
import IAttestation from '../types/Attestation';
import IRequestForAttestation from '../types/RequestForAttestation';
export default class Attestation implements IAttestation {
    claimHash: IAttestation['claimHash'];
    cTypeHash: IAttestation['cTypeHash'];
    owner: IAttestation['owner'];
    revoked: IAttestation['revoked'];
    delegationId?: IAttestation['delegationId'];
    /**
     * Builds a new [[Attestation]] instance.
     *
     * @param requestForAttestation - A request for attestation, usually sent by a claimer.
     * @param attester - The identity of the attester.
     * @param revoked - Whether the attestation should be revoked.
     * @example
     * ```javascript
     * // create an attestation, e.g. to store it on-chain
     * new Attestation(requestForAttestation, attester);
     * ```
     */
    constructor(requestForAttestation: IRequestForAttestation, attester: Identity, revoked?: boolean);
    /**
     * [STATIC] [ASYNC] Queries the chain for a given attestation, by `claimHash`.
     *
     * @param claimHash - The hash of the claim that corresponds to the attestation to query.
     * @returns A promise containing the [[Attestation]] or null.
     * @example
     * ```javascript
     * Attestation.query('0xd8024cdc147c4fa9221cd177').then(attestation => {
     *    // now we can for example revoke `attestation`
     * });
     * ```
     */
    static query(claimHash: string): Promise<Attestation | null>;
    /**
     * [STATIC] [ASYNC] Revokes an attestation. Also available as an instance method.
     *
     * @param claimHash - The hash of the claim that corresponds to the attestation to revoke.
     * @param identity - The identity used to revoke the attestation (should be an attester identity, or have delegated rights).
     * @returns A promise containing the [[TxStatus]] (transaction status).
     * @example
     * ```javascript
     * Attestation.revoke('0xd8024cdc147c4fa9221cd177').then(() => {
     *   // the attestation was successfully revoked
     * });
     * ```
     */
    static revoke(claimHash: string, identity: Identity): Promise<TxStatus>;
    /**
     * [STATIC] Builds an instance of [[Attestation]], from a simple object with the same properties.
     * Used for deserialization.
     *
     * @param obj - The base object from which to create the attestation.
     * @returns A new [[Attestation]] object.
     * @example
     * ```javascript
     * // create an Attestation object, so we can call methods on it (`serialized` is a serialized Attestation object )
     * Attestation.fromObject(JSON.parse(serialized));
     * ```
     */
    static fromObject(obj: IAttestation): Attestation;
    /**
     * [ASYNC] Stores the attestation on chain.
     *
     * @param identity - The identity used to store the attestation.
     * @returns A promise containing the [[TxStatus]] (transaction status).
     * @example Use [[store]] to store an attestation on chain, and to create an [[AttestedClaim]] upon success:
     * ```javascript
     * attestation.store(attester).then(() => {
     *    // the attestation was successfully stored, so now we can for example create an AttestedClaim
     * });
     * ```
     */
    store(identity: Identity): Promise<TxStatus>;
    /**
     * [ASYNC] Revokes the attestation. Also available as a static method.
     *
     * @param identity - The identity used to revoke the attestation (should be an attester identity, or have delegated rights).
     * @returns A promise containing the [[TxStatus]] (transaction status).
     * @example
     * ```javascript
     * attestation.revoke(identity).then(() => {
     *    // the attestation was successfully revoked
     * });
     * ```
     */
    revoke(identity: Identity): Promise<TxStatus>;
    /**
     * [ASYNC] Queries an attestation from the chain and checks its validity.
     *
     * @param claimHash - The hash of the claim that corresponds to the attestation to check. Defaults to the claimHash for the attestation onto which "verify" is called.
     * @returns A promise containing whether the attestation is valid.
     * @example
     * ```javascript
     * attestation.verify().then(isVerified => {
     *   // `isVerified` is true if the attestation is verified, false otherwise
     * });
     * ```
     */
    verify(claimHash?: string): Promise<boolean>;
    /**
     * Checks if the attestation is valid. An attestation is valid if it:
     * * exists;
     * * and has the correct owner;
     * * and is not revoked.
     *
     * @param attestation - The attestation to check.
     * @returns Whether the attestation is valid.
     */
    private isAttestationValid;
}
