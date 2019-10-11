"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Identity_1 = tslib_1.__importDefault(require("../identity/Identity"));
const RequestForAttestation_1 = tslib_1.__importDefault(require("../requestforattestation/RequestForAttestation"));
const AttestedClaim_1 = tslib_1.__importDefault(require("./AttestedClaim"));
const Attestation_1 = tslib_1.__importDefault(require("../attestation/Attestation"));
function buildAttestedClaim(claimer, attester, ctype, contents, legitimations) {
    // create claim
    const claim = {
        cType: ctype,
        contents,
        owner: claimer.address,
    };
    // build request for attestation with legimitations
    const requstForAttestation = new RequestForAttestation_1.default(claim, legitimations, claimer);
    // build attestation
    const attestation = new Attestation_1.default(requstForAttestation, attester);
    // combine to attested claim
    const attestedClaim = new AttestedClaim_1.default(requstForAttestation, attestation);
    return attestedClaim;
}
describe('RequestForAttestation', () => {
    const identityAlice = Identity_1.default.buildFromURI('//Alice');
    const identityBob = Identity_1.default.buildFromURI('//Bob');
    const identityCharlie = Identity_1.default.buildFromURI('//Charlie');
    const identityDoria = Identity_1.default.buildFromURI('//Doria');
    const legitimation = buildAttestedClaim(identityAlice, identityBob, 'legitimationCtype', {}, []);
    it('verify attested claims', async () => {
        const attestedClaim = buildAttestedClaim(identityCharlie, identityDoria, 'ctype', {
            a: 'a',
            b: 'b',
            c: 'c',
        }, [legitimation]);
        // check proof on complete data
        expect(attestedClaim.verifyData()).toBeTruthy();
        // build a repesentation excluding claim properties and verify proof
        const correctPresentation = attestedClaim.createPresentation(['a']);
        expect(correctPresentation.verifyData()).toBeTruthy();
        // just deleting a field will result in a wrong proof
        const falsePresentation = attestedClaim.createPresentation([]);
        const propertyName = 'a';
        delete falsePresentation.request.claim.contents[propertyName];
        delete falsePresentation.request.claimHashTree[propertyName];
        expect(falsePresentation.verifyData()).toBeFalsy();
    });
});
//# sourceMappingURL=AttestedClaim.spec.js.map