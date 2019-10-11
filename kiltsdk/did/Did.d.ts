/**
 * A Decentralized Identifier (DID) is a new type of identifier that is globally unique, resolveable with high availability, and cryptographically verifiable. Although it's not mandatory in KILT, users can optionally create a DID and anchor it to the KILT blockchain.
 * <br>
 * Official DID specification: [[https://w3c-ccg.github.io/did-primer/]].
 * ***
 * The [[Did]] class exposes methods to build, store and query decentralized identifiers.
 * @module DID
 * @preferred
 */
/**
 * Dummy comment needed for correct doc display, do not remove
 */
import Identity from '../identity/Identity';
import TxStatus from '../blockchain/TxStatus';
export declare const IDENTIFIER_PREFIX = "did:kilt:";
export declare const SERVICE_KILT_MESSAGING = "KiltMessagingService";
export declare const KEY_TYPE_SIGNATURE = "Ed25519VerificationKey2018";
export declare const KEY_TYPE_ENCRYPTION = "X25519Salsa20Poly1305Key2018";
export interface IDid {
    /**
     * The DID identifier under which it is store on chain.
     */
    identifier: string;
    /**
     * The public box key of the associated identity.
     */
    publicBoxKey: string;
    /**
     * The public signing key of the associated identity.
     */
    publicSigningKey: string;
    /**
     * The document store reference.
     */
    documentStore: string | null;
}
export default class Did implements IDid {
    /**
     * @description Queries the [Did] from chain using the [identifier]
     *
     * @param identifier the DIDs identifier
     * @returns promise containing the [[Did]] or [null]
     */
    static queryByIdentifier(identifier: string): Promise<IDid | null>;
    /**
     * @description Queries the [Did] from chain using the [address]
     *
     * @param address the DIDs address
     * @returns promise containing the [[Did]] or [null]
     */
    static queryByAddress(address: string): Promise<IDid | null>;
    /**
     * @description Removes the [[Did]] attached to [identity] from chain
     *
     * @param identity the identity for which to delete the [[Did]]
     * @returns promise containing the [[TxStatus]]
     */
    static remove(identity: Identity): Promise<TxStatus>;
    /**
     * @description Builds a [[Did]] from the given [identity].
     *
     * @param identity the identity used to build the [[Did]]
     * @param documentStore optional document store reference
     * @returns the [[Did]]
     */
    static fromIdentity(identity: Identity, documentStore?: string): Did;
    readonly identifier: string;
    readonly publicBoxKey: string;
    readonly publicSigningKey: string;
    readonly documentStore: string | null;
    private constructor();
    /**
     * @description Stores the [[Did]] on chain
     *
     * @param identity the identity used to store the [[Did]] on chain
     * @returns promise containing the [[TxStatus]]
     */
    store(identity: Identity): Promise<TxStatus>;
    /**
     * @description Builds the default DID document from this [[Did]]
     *
     * @param kiltServiceEndpoint URI pointing to the service endpoint
     * @returns the default DID document
     */
    getDefaultDocument(kiltServiceEndpoint?: string): object;
}
