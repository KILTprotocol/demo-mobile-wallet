"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CTypeSchema_1 = require("./CTypeSchema");
const CTypeUtils_1 = require("./CTypeUtils");
jest.mock('../blockchain/Blockchain');
const ctypeInput = {
    $id: 'http://example.com/ctype-1',
    $schema: 'http://kilt-protocol.org/draft-01/ctype-input#',
    properties: [
        {
            title: 'First Property',
            $id: 'first-property',
            type: 'integer',
        },
        {
            title: 'Second Property',
            $id: 'second-property',
            type: 'string',
        },
    ],
    type: 'object',
    title: 'CType Title',
    required: ['first-property', 'second-property'],
};
const ctypeWrapperModel = {
    schema: {
        $id: 'http://example.com/ctype-1',
        $schema: 'http://kilt-protocol.org/draft-01/ctype#',
        properties: {
            'first-property': { type: 'integer' },
            'second-property': { type: 'string' },
        },
        type: 'object',
    },
    metadata: {
        title: { default: 'CType Title' },
        description: {},
        properties: {
            'first-property': { title: { default: 'First Property' } },
            'second-property': { title: { default: 'Second Property' } },
        },
    },
};
const goodClaim = {
    'first-property': 10,
    'second-property': '12',
};
const badClaim = {
    'first-property': '1',
    'second-property': '12',
    'third-property': true,
};
describe('CTypeUtils', () => {
    it('verifies claims', () => {
        expect(CTypeUtils_1.verifyClaimStructure(goodClaim, ctypeWrapperModel.schema)).toBeTruthy();
        expect(CTypeUtils_1.verifyClaimStructure(badClaim, ctypeWrapperModel.schema)).toBeFalsy();
        expect(CTypeUtils_1.verifySchemaWithErrors(badClaim, CTypeSchema_1.CTypeWrapperModel, [])).toBeFalsy();
        expect(() => {
            CTypeUtils_1.verifyClaimStructure(badClaim, ctypeInput);
        }).toThrow(new Error('CType does not correspond to schema'));
    });
    it('verifies ctypes', () => {
        expect(CTypeUtils_1.verifySchema(ctypeInput, CTypeSchema_1.CTypeInputModel)).toBeTruthy();
        expect(CTypeUtils_1.verifySchema(ctypeWrapperModel.schema, CTypeSchema_1.CTypeModel)).toBeTruthy();
        expect(CTypeUtils_1.verifySchema(ctypeWrapperModel, CTypeSchema_1.CTypeInputModel)).toBeFalsy();
        expect(CTypeUtils_1.verifySchema(ctypeWrapperModel.schema, CTypeSchema_1.CTypeInputModel)).toBeFalsy();
        expect(CTypeUtils_1.verifySchema({
            $id: 'http://example.com/ctype-1',
            $schema: 'http://kilt-protocol.org/draft-01/ctype-input#',
            properties: [],
            type: 'object',
            title: '',
        }, CTypeSchema_1.CTypeInputModel)).toBeFalsy();
    });
});
//# sourceMappingURL=CTypeUtils.spec.js.map