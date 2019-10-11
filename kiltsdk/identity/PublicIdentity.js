"use strict";
/**
 * @module Identity
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/**
 * Dummy comment needed for correct doc display, do not remove.
 */
const Did_1 = tslib_1.__importStar(require("../did/Did"));
const Did_utils_1 = require("../did/Did.utils");
function isDIDDocument(object) {
    const didDocument = object;
    return !!didDocument.id && !!didDocument.publicKey && !!didDocument.service;
}
function isDIDResult(object) {
    return isDIDDocument(object.didDocument);
}
class PublicIdentity {
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
    static fromDidDocument(didDocument) {
        if (!isDIDDocument(didDocument))
            return null;
        try {
            return new PublicIdentity(didDocument.id.startsWith(Did_1.IDENTIFIER_PREFIX)
                ? Did_utils_1.getAddressFromIdentifier(didDocument.id)
                : didDocument.id, this.getJSONProperty(didDocument, 'publicKey', 'type', Did_1.KEY_TYPE_ENCRYPTION, 'publicKeyHex'), this.getJSONProperty(didDocument, 'service', 'type', Did_1.SERVICE_KILT_MESSAGING, 'serviceEndpoint'));
        }
        catch (e) {
            return null;
        }
    }
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
    static async resolveFromDid(identifier, urlResolver) {
        if (identifier.startsWith(Did_1.IDENTIFIER_PREFIX)) {
            const did = await Did_1.default.queryByIdentifier(identifier);
            if (did !== null) {
                const didDocument = did.documentStore
                    ? await urlResolver.resolve(did.documentStore)
                    : null;
                // TODO: check, if did document is complete
                if (didDocument) {
                    return this.fromDidDocument(didDocument);
                }
                return new PublicIdentity(Did_utils_1.getAddressFromIdentifier(did.identifier), did.publicBoxKey);
            }
        }
        else {
            const didResult = await urlResolver.resolve(`https://uniresolver.io/1.0/identifiers/${encodeURIComponent(identifier)}`);
            if (didResult && isDIDResult(didResult)) {
                return this.fromDidDocument(didResult.didDocument);
            }
        }
        return null;
    }
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
    constructor(address, boxPublicKeyAsHex, serviceAddress) {
        this.address = address;
        this.boxPublicKeyAsHex = boxPublicKeyAsHex;
        this.serviceAddress = serviceAddress;
    }
    static getJSONProperty(did, listProperty, filterKey, filterValue, property) {
        if (!did[listProperty]) {
            throw Error();
        }
        const listOfObjects = did[listProperty];
        const correctObj = listOfObjects.find(object => {
            return object[filterKey] && object[filterKey] === filterValue;
        });
        if (correctObj && correctObj[property])
            return correctObj[property];
        throw new Error();
    }
}
exports.default = PublicIdentity;
//# sourceMappingURL=PublicIdentity.js.map