"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Claim_1 = tslib_1.__importDefault(require("./Claim"));
const CType_1 = tslib_1.__importDefault(require("../ctype/CType"));
const Identity_1 = tslib_1.__importDefault(require("../identity/Identity"));
describe('Claim', () => {
    const ctype = new CType_1.default({
        schema: {
            $id: 'http://example.com/ctype-1',
            $schema: 'http://kilt-protocol.org/draft-01/ctype#',
            properties: {
                name: { type: 'string' },
            },
            type: 'object',
        },
        metadata: {
            title: { default: 'CType Title' },
            description: {},
            properties: {
                name: { title: { default: 'Name' } },
            },
        },
    });
    const identity = Identity_1.default.buildFromURI('//Alice');
    const claimContents = {
        name: 'Bob',
    };
    const claim = new Claim_1.default(ctype, claimContents, identity);
    it('can be made from object', () => {
        const claimObj = JSON.parse(JSON.stringify(claim));
        expect(Claim_1.default.fromObject(claimObj)).toEqual(claim);
    });
});
//# sourceMappingURL=Claim.spec.js.map