/**
 * @module Identity
 */
import IPublicIdentity from '../types/PublicIdentity';
export interface IURLResolver {
    resolve(url: string): Promise<object | null>;
}
export default class PublicIdentity implements IPublicIdentity {
    /**
     * [STATIC] Creates a new Public Identity from a DID document (DID - Decentralized Identifiers: https://w3c-ccg.github.io/did-spec/).
     *
     * @param didDocument - Contains the public key, external ID and service endpoint.
     * @returns A new [[PublicIdentity]] object.
     * @example
     * ```javascript
     * PublicIdentity.fromDidDocument(didDocument);
     * ```
     */
    static fromDidDocument(didDocument: object): IPublicIdentity | null;
    /**
     * [STATIC] [ASYNC] Resolves a decentralized identifier (DID) into a [[PublicIdentity]].
     *
     * @param identifier - The Decentralized Identifier to be resolved.
     * @param urlResolver  - A URL resolver, which is used to query the did document.
     * @returns A new [[PublicIdentity]] object.
     * @example
     * ```javascript
     * PublicIdentity.resolveFromDid('did:kilt:1234567', urlResolver);
     * ```
     */
    static resolveFromDid(identifier: string, urlResolver: IURLResolver): Promise<IPublicIdentity | null>;
    readonly address: IPublicIdentity['address'];
    readonly boxPublicKeyAsHex: IPublicIdentity['boxPublicKeyAsHex'];
    readonly serviceAddress?: IPublicIdentity['serviceAddress'];
    /**
     * Builds a new [[PublicIdentity]] instance.
     *
     * @param address - A public address.
     * @param boxPublicKeyAsHex - The public encryption key.
     * @param serviceAddress - The address of the service used to retreive the DID.
     * @example
     * ```javascript
     * new PublicIdentity(address, boxPublicKeyAsHex, serviceAddress);
     * ```
     */
    constructor(address: IPublicIdentity['address'], boxPublicKeyAsHex: IPublicIdentity['boxPublicKeyAsHex'], serviceAddress?: IPublicIdentity['serviceAddress']);
    private static getJSONProperty;
}
