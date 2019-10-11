"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const types_1 = require("@polkadot/types");
const PublicIdentity_1 = tslib_1.__importDefault(require("./PublicIdentity"));
jest.mock('../blockchainApiConnection/BlockchainApiConnection');
describe('PublicIdentity', () => {
    // https://polkadot.js.org/api/examples/promise/
    // testing to create correct demo accounts
    it('should resolve internal and external dids', async () => {
        require('../blockchain/Blockchain').default.__mockQueryDidDids = jest.fn(id => {
            let tuple;
            switch (id) {
                case '1':
                    tuple = new types_1.Tuple(
                    // (public-signing-key, public-encryption-key, did-reference?)
                    [types_1.Text, types_1.Text, types_1.Text], ['pub-key', 'box-key', '0x80001f']);
                    break;
                case '2':
                    tuple = new types_1.Tuple(
                    // (public-signing-key, public-encryption-key, did-reference?)
                    [types_1.Text, types_1.Text, types_1.Text], ['pub-key', 'box-key', undefined]);
                    break;
                default:
                    tuple = undefined;
            }
            return Promise.resolve(tuple);
        });
        const externalPubId = await PublicIdentity_1.default.resolveFromDid('did:sov:1', {
            resolve: async () => {
                return {
                    didDocument: {
                        id: 'external-id',
                        publicKey: [
                            {
                                id: 'extenal-id#key-1',
                                type: 'X25519Salsa20Poly1305Key2018',
                                publicKeyHex: 'external-box-key',
                            },
                        ],
                        service: [
                            {
                                id: 'extenal-id#service-1',
                                type: 'KiltMessagingService',
                                serviceEndpoint: 'external-service-address',
                            },
                        ],
                    },
                };
            },
        });
        expect(externalPubId).toEqual({
            address: 'external-id',
            boxPublicKeyAsHex: 'external-box-key',
            serviceAddress: 'external-service-address',
        });
        const internalPubId = await PublicIdentity_1.default.resolveFromDid('did:kilt:1', {
            resolve: async () => {
                return {
                    id: 'internal-id',
                    publicKey: [
                        {
                            id: 'internal-id#key-1',
                            type: 'X25519Salsa20Poly1305Key2018',
                            publicKeyHex: 'internal-box-key',
                        },
                    ],
                    service: [
                        {
                            id: 'internal-id#service-1',
                            type: 'KiltMessagingService',
                            serviceEndpoint: 'internal-service-address',
                        },
                    ],
                };
            },
        });
        expect(internalPubId).toEqual({
            address: 'internal-id',
            boxPublicKeyAsHex: 'internal-box-key',
            serviceAddress: 'internal-service-address',
        });
        const bcOnleyubId = await PublicIdentity_1.default.resolveFromDid('did:kilt:2', {});
        expect(bcOnleyubId).toEqual({
            address: '2',
            boxPublicKeyAsHex: 'box-key',
            serviceAddress: undefined,
        });
        expect(await PublicIdentity_1.default.resolveFromDid('did:kilt:1', {
            resolve: async () => {
                return {
                    id: 'internal-id',
                    publicKey: [],
                    service: [],
                };
            },
        })).toEqual(null);
        expect(await PublicIdentity_1.default.resolveFromDid('did:kilt:1', {
            resolve: async () => {
                return {
                    id: 'internal-id',
                    service: [],
                };
            },
        })).toEqual(null);
        expect(await PublicIdentity_1.default.resolveFromDid('did:kilt:1', {
            resolve: async () => {
                return {
                    publicKey: [],
                    service: [],
                };
            },
        })).toEqual(null);
        expect(await PublicIdentity_1.default.resolveFromDid('did:kilt:3', {})).toEqual(null);
    });
});
//# sourceMappingURL=PublicIdentity.spec.js.map