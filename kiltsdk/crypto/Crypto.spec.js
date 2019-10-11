"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const string = tslib_1.__importStar(require("@polkadot/util/string"));
const Identity_1 = tslib_1.__importDefault(require("../identity/Identity"));
const index_1 = tslib_1.__importDefault(require("./index"));
describe('Crypto', () => {
    // TODO: create static objects for testing
    const alice = Identity_1.default.buildFromMnemonic();
    const bob = Identity_1.default.buildFromMnemonic();
    const messageStr = 'This is a test';
    const message = new Uint8Array(string.stringToU8a(messageStr));
    it('should sign and verify (UInt8Array)', () => {
        // @ts-ignore
        const signature = index_1.default.sign(message, alice.signKeyringPair);
        expect(signature).not.toBeFalsy();
        expect(index_1.default.verify(message, signature, alice.address)).toBe(true);
        expect(index_1.default.verify(message, signature, bob.address)).toBe(false);
        expect(index_1.default.verify(new Uint8Array([0, 0, 0]), signature, alice.address)).toBe(false);
    });
    it('should sign and verify (string)', () => {
        // @ts-ignore
        const signature = index_1.default.signStr(messageStr, alice.signKeyringPair);
        expect(signature).not.toBeFalsy();
        expect(index_1.default.verify(messageStr, signature, alice.signPublicKeyAsHex)).toBe(true);
        expect(index_1.default.verify(messageStr, signature, bob.signPublicKeyAsHex)).toBe(false);
        expect(index_1.default.verify('0x000000', signature, alice.signPublicKeyAsHex)).toBe(false);
    });
    // https://polkadot.js.org/common/examples/util-crypto/01_encrypt_decrypt_message_nacl/
    it('should encrypt and decrypt symmetrical using random secret key (UInt8Array)', () => {
        const secret = new Uint8Array([
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20,
            21,
            22,
            23,
            24,
            25,
            26,
            27,
            28,
            29,
            30,
            31,
        ]);
        const data = index_1.default.encryptSymmetric(message, secret);
        expect(data).not.toBeFalsy();
        expect(index_1.default.decryptSymmetric(data, secret)).toEqual(message);
        const dataWithNonce = index_1.default.encryptSymmetric(message, secret, data.nonce);
        expect(index_1.default.decryptSymmetric(dataWithNonce, secret)).toEqual(message);
    });
    // https://polkadot.js.org/common/examples/util-crypto/01_encrypt_decrypt_message_nacl/
    it('should encrypt and decrypt symmetrical using random secret key (string)', () => {
        const secret = '0x000102030405060708090A0B0C0D0E0F101112131415161718191A1B1C1D1E1F';
        const data = index_1.default.encryptSymmetricAsStr(messageStr, secret);
        expect(data).not.toBeFalsy();
        expect(index_1.default.decryptSymmetricStr(data, secret)).toEqual(messageStr);
        expect(index_1.default.decryptSymmetricStr({ encrypted: '0x000102030405060708090A0B0C0D0E0F', nonce: data.nonce }, secret)).toEqual(null);
        const dataWithNonce = index_1.default.encryptSymmetricAsStr(messageStr, secret, data.nonce);
        expect(index_1.default.decryptSymmetricStr(dataWithNonce, secret)).toEqual(messageStr);
    });
    it('should hash', () => {
        expect(index_1.default.hash(message)).toHaveLength(32);
        expect(index_1.default.hash(message)).toEqual(index_1.default.hash(message));
        expect(index_1.default.hash('123')).toEqual(index_1.default.hash('123'));
        expect(index_1.default.hash(new Uint8Array([0, 0, 0]))).not.toEqual(index_1.default.hash(message));
        expect(index_1.default.hash('123')).not.toEqual(index_1.default.hash(message));
        expect(index_1.default.hashStr('123')).not.toEqual(index_1.default.hashStr(message));
    });
    it('should encrypt and decrypt asymmetrical (string)', () => {
        const encrypted = index_1.default.encryptAsymmetricAsStr(messageStr, alice.boxPublicKeyAsHex, 
        // @ts-ignore
        bob.boxKeyPair.secretKey);
        expect(encrypted).not.toEqual(messageStr);
        const decrypted = index_1.default.decryptAsymmetricAsStr(encrypted, bob.boxPublicKeyAsHex, 
        // @ts-ignore
        alice.boxKeyPair.secretKey);
        expect(decrypted).toEqual(messageStr);
        const decryptedFalse = index_1.default.decryptAsymmetricAsStr(encrypted, bob.boxPublicKeyAsHex, 
        // @ts-ignore
        bob.boxKeyPair.secretKey);
        expect(decryptedFalse).toEqual(false);
    });
    it('should encrypt and decrypt asymmetrical (UInt8Array)', () => {
        const encrypted = index_1.default.encryptAsymmetric(message, 
        // @ts-ignore
        alice.boxKeyPair.publicKey, 
        // @ts-ignore
        bob.boxKeyPair.secretKey);
        expect(encrypted).not.toEqual(message);
        const decrypted = index_1.default.decryptAsymmetric(encrypted, 
        // @ts-ignore
        bob.boxKeyPair.publicKey, 
        // @ts-ignore
        alice.boxKeyPair.secretKey);
        expect(decrypted).toEqual(message);
    });
});
//# sourceMappingURL=Crypto.spec.js.map