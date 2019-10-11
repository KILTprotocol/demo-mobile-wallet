"use strict";
/**
 * A Decentralized Identifier (DID) is a new type of identifier that is globally unique, resolveable with high availability, and cryptographically verifiable. Although it's not mandatory in KILT, users can optionally create a DID and anchor it to the KILT blockchain.
 * <br>
 * Official DID specification: [[https://w3c-ccg.github.io/did-primer/]].
 * ***
 * The [[Did]] class exposes methods to build, store and query decentralized identifiers.
 * @module DID
 * @preferred
 */
Object.defineProperty(exports, "__esModule", { value: true });
const ConfigLog_1 = require("../config/ConfigLog");
const Did_utils_1 = require("./Did.utils");
const Did_chain_1 = require("./Did.chain");
const log = ConfigLog_1.factory.getLogger('DID');
exports.IDENTIFIER_PREFIX = 'did:kilt:';
exports.SERVICE_KILT_MESSAGING = 'KiltMessagingService';
exports.KEY_TYPE_SIGNATURE = 'Ed25519VerificationKey2018';
exports.KEY_TYPE_ENCRYPTION = 'X25519Salsa20Poly1305Key2018';
class Did {
    /**
     * @description Queries the [Did] from chain using the [identifier]
     *
     * @param identifier the DIDs identifier
     * @returns promise containing the [[Did]] or [null]
     */
    static queryByIdentifier(identifier) {
        return Did_chain_1.queryByIdentifier(identifier);
    }
    /**
     * @description Queries the [Did] from chain using the [address]
     *
     * @param address the DIDs address
     * @returns promise containing the [[Did]] or [null]
     */
    static queryByAddress(address) {
        return Did_chain_1.queryByAddress(address);
    }
    /**
     * @description Removes the [[Did]] attached to [identity] from chain
     *
     * @param identity the identity for which to delete the [[Did]]
     * @returns promise containing the [[TxStatus]]
     */
    static async remove(identity) {
        log.debug(`Create tx for 'did.remove'`);
        return Did_chain_1.remove(identity);
    }
    /**
     * @description Builds a [[Did]] from the given [identity].
     *
     * @param identity the identity used to build the [[Did]]
     * @param documentStore optional document store reference
     * @returns the [[Did]]
     */
    static fromIdentity(identity, documentStore) {
        const identifier = Did_utils_1.getIdentifierFromAddress(identity.address);
        return new Did(identifier, identity.boxPublicKeyAsHex, identity.signPublicKeyAsHex, documentStore);
    }
    constructor(identifier, publicBoxKey, publicSigningKey, documentStore = null) {
        this.identifier = identifier;
        this.publicBoxKey = publicBoxKey;
        this.publicSigningKey = publicSigningKey;
        this.documentStore = documentStore;
    }
    /**
     * @description Stores the [[Did]] on chain
     *
     * @param identity the identity used to store the [[Did]] on chain
     * @returns promise containing the [[TxStatus]]
     */
    async store(identity) {
        log.debug(`Create tx for 'did.add'`);
        return Did_chain_1.store(this, identity);
    }
    /**
     * @description Builds the default DID document from this [[Did]]
     *
     * @param kiltServiceEndpoint URI pointing to the service endpoint
     * @returns the default DID document
     */
    getDefaultDocument(kiltServiceEndpoint) {
        const result = {
            id: this.identifier,
            authentication: {
                type: 'Ed25519SignatureAuthentication2018',
                publicKey: [`${this.identifier}#key-1`],
            },
            publicKey: [
                {
                    id: `${this.identifier}#key-1`,
                    type: exports.KEY_TYPE_SIGNATURE,
                    controller: this.identifier,
                    publicKeyHex: this.publicSigningKey,
                },
                {
                    id: `${this.identifier}#key-2`,
                    type: exports.KEY_TYPE_ENCRYPTION,
                    controller: this.identifier,
                    publicKeyHex: this.publicBoxKey,
                },
            ],
            '@context': 'https://w3id.org/did/v1',
            service: kiltServiceEndpoint
                ? [
                    {
                        type: exports.SERVICE_KILT_MESSAGING,
                        serviceEndpoint: kiltServiceEndpoint,
                    },
                ]
                : [],
        };
        return result;
    }
}
exports.default = Did;
//# sourceMappingURL=Did.js.map