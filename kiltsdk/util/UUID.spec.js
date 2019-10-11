"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const UUID_1 = tslib_1.__importDefault(require("./UUID"));
describe('UUID', () => {
    it('generate', async () => {
        const uuid = UUID_1.default.generate();
        console.log('generated UUID', uuid);
        expect(uuid.substr(0, 2)).toEqual('0x');
        expect(uuid.substr(2)).toHaveLength(64);
    });
});
//# sourceMappingURL=UUID.spec.js.map