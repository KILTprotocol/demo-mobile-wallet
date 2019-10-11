"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const types_1 = require("@polkadot/types");
const Bool_1 = tslib_1.__importDefault(require("@polkadot/types/primitive/Bool"));
const codec_1 = require("@polkadot/types/codec");
const crypto_1 = tslib_1.__importDefault(require("../crypto"));
const Identity_1 = tslib_1.__importDefault(require("../identity/Identity"));
const Attestation_1 = tslib_1.__importDefault(require("./Attestation"));
const RequestForAttestation_1 = tslib_1.__importDefault(require("../requestforattestation/RequestForAttestation"));
jest.mock('../blockchainApiConnection/BlockchainApiConnection');
describe('Attestation', () => {
    const identityAlice = Identity_1.default.buildFromURI('//Alice');
    const identityBob = Identity_1.default.buildFromURI('//Bob');
    const Blockchain = require('../blockchain/Blockchain').default;
    const cTypeHash = crypto_1.default.hashStr('testCtype');
    const claim = {
        cType: cTypeHash,
        contents: {},
        owner: identityBob.address,
    };
    const requestForAttestation = new RequestForAttestation_1.default(claim, [], identityBob);
    it('stores attestation', async () => {
        Blockchain.api.query.attestation.attestations = jest.fn(() => {
            const tuple = new codec_1.Tuple([types_1.Text, types_1.Text, types_1.Text, Bool_1.default], [cTypeHash, identityAlice.address, undefined, false]);
            return Promise.resolve(tuple);
        });
        const attestation = new Attestation_1.default(requestForAttestation, identityAlice);
        expect(await attestation.verify()).toBeTruthy();
    });
    it('verify attestations not on chain', async () => {
        Blockchain.api.query.attestation.attestations = jest.fn(() => {
            return Promise.resolve(new codec_1.Tuple([], []));
        });
        const attestation = new Attestation_1.default(requestForAttestation, identityAlice, false);
        expect(await attestation.verify()).toBeFalsy();
    });
    it('verify attestation revoked', async () => {
        Blockchain.api.query.attestation.attestations = jest.fn(() => {
            return Promise.resolve(new codec_1.Tuple(
            // Attestations: claim-hash -> (ctype-hash, account, delegation-id?, revoked)
            [types_1.Text, types_1.Text, types_1.Text, Bool_1.default], [cTypeHash, identityAlice, undefined, true]));
        });
        const attestation = new Attestation_1.default(requestForAttestation, identityAlice, true);
        expect(await attestation.verify()).toBeFalsy();
    });
});
//# sourceMappingURL=Attestation.spec.js.map