"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Identity_1 = tslib_1.__importDefault(require("../identity/Identity"));
const RequestForAttestation_1 = tslib_1.__importDefault(require("./RequestForAttestation"));
const AttestedClaim_1 = tslib_1.__importDefault(require("../attestedclaim/AttestedClaim"));
const Attestation_1 = tslib_1.__importDefault(require("../attestation/Attestation"));
function buildRequestForAttestation(claimer, ctype, contents, legitimations) {
    // create claim
    const claim = {
        cType: ctype,
        contents,
        owner: claimer.address,
    };
    // build request for attestation with legimitations
    return new RequestForAttestation_1.default(claim, legitimations, claimer);
}
describe('RequestForAttestation', () => {
    const identityAlice = Identity_1.default.buildFromURI('//Alice');
    const identityBob = Identity_1.default.buildFromURI('//Bob');
    const identityCharlie = Identity_1.default.buildFromURI('//Charlie');
    const legitimationRequest = buildRequestForAttestation(identityAlice, 'legitimationCtype', {}, []);
    // build attestation
    const legitimationAttestation = new Attestation_1.default(legitimationRequest, identityCharlie);
    // combine to attested claim
    const legitimation = new AttestedClaim_1.default(legitimationRequest, legitimationAttestation);
    it('verify request for attestation', async () => {
        const request = buildRequestForAttestation(identityBob, 'ctype', {
            a: 'a',
            b: 'b',
            c: 'c',
        }, [legitimation]);
        // check proof on complete data
        expect(request.verifyData()).toBeTruthy();
        // just deleting a field will result in a wrong proof
        const propertyName = 'a';
        delete request.claim.contents[propertyName];
        delete request.claimHashTree[propertyName];
        expect(request.verifyData()).toBeFalsy();
    });
    it('hides the claim owner', () => {
        const request = buildRequestForAttestation(identityBob, 'ctype', {}, []);
        request.removeClaimOwner();
        expect(request.claimOwner.nonce).toBeUndefined();
        expect(request.claim.owner).toBeUndefined();
    });
    it('hides claim properties', () => {
        const request = buildRequestForAttestation(identityBob, 'ctype', { a: 'a', b: 'b' }, []);
        request.removeClaimProperties(['a']);
        expect(request.claim.contents.a).toBeUndefined();
        expect(request.claimHashTree.a.nonce).toBeUndefined();
        expect(request.claim.contents.b).toBe('b');
        expect(request.claimHashTree.b.nonce).toBeDefined();
    });
});
//# sourceMappingURL=RequestForAttestation.spec.js.map