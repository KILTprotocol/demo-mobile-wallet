"use strict";
/**
 * Crypto provides KILT with the utility types and methods useful for cryptographic operations, such as signing/verifying, encrypting/decrypting and hashing.
 * ***
 * The utility types and methods are wrappers for existing Polkadot functions and imported throughout KILT's protocol for various cryptographic needs.
 * @module Crypto
 * @preferred
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/**
 * Dummy comment needed for correct doc display, do not remove
 */
const address_1 = require("@polkadot/keyring/address");
exports.decodeAddress = address_1.decodeAddress;
exports.encodeAddress = address_1.encodeAddress;
const pair_1 = tslib_1.__importDefault(require("@polkadot/keyring/pair"));
const util_1 = require("@polkadot/util");
exports.u8aConcat = util_1.u8aConcat;
exports.u8aToHex = util_1.u8aToHex;
const asU8a_1 = tslib_1.__importDefault(require("@polkadot/util-crypto/blake2/asU8a"));
const decrypt_1 = tslib_1.__importDefault(require("@polkadot/util-crypto/nacl/decrypt"));
const encrypt_1 = tslib_1.__importDefault(require("@polkadot/util-crypto/nacl/encrypt"));
const tweetnacl_1 = tslib_1.__importDefault(require("tweetnacl"));
const jsonabc = tslib_1.__importStar(require("jsonabc"));
function coToUInt8(input, rawConvert) {
    if (rawConvert && util_1.isString(input)) {
        return util_1.stringToU8a(input);
    }
    return util_1.u8aToU8a(input);
}
exports.coToUInt8 = coToUInt8;
function sign(message, signKeyPair) {
    return signKeyPair.sign(coToUInt8(message));
}
exports.sign = sign;
function signStr(message, signKeyPair) {
    return util_1.u8aToHex(sign(message, signKeyPair));
}
exports.signStr = signStr;
function verify(message, signature, address) {
    const publicKey = address_1.decodeAddress(address);
    const keyringPair = pair_1.default('ed25519', { publicKey });
    return keyringPair.verify(coToUInt8(message), coToUInt8(signature));
}
exports.verify = verify;
function encryptSymmetric(message, secret, nonce) {
    return encrypt_1.default(coToUInt8(message, true), coToUInt8(secret), nonce ? coToUInt8(nonce) : undefined);
}
exports.encryptSymmetric = encryptSymmetric;
function encryptSymmetricAsStr(message, secret, inputNonce) {
    const result = encrypt_1.default(coToUInt8(message, true), coToUInt8(secret), inputNonce ? coToUInt8(inputNonce) : undefined);
    const nonce = util_1.u8aToHex(result.nonce);
    const encrypted = util_1.u8aToHex(result.encrypted);
    return { encrypted, nonce };
}
exports.encryptSymmetricAsStr = encryptSymmetricAsStr;
function decryptSymmetric(data, secret) {
    return decrypt_1.default(coToUInt8(data.encrypted), coToUInt8(data.nonce), coToUInt8(secret));
}
exports.decryptSymmetric = decryptSymmetric;
function decryptSymmetricStr(data, secret) {
    const result = decrypt_1.default(coToUInt8(data.encrypted), coToUInt8(data.nonce), coToUInt8(secret));
    return result ? util_1.u8aToString(result) : null;
}
exports.decryptSymmetricStr = decryptSymmetricStr;
function hash(value, bitLength) {
    return asU8a_1.default(value, bitLength);
}
exports.hash = hash;
function hashStr(value) {
    return util_1.u8aToHex(hash(value));
}
exports.hashStr = hashStr;
function hashObjectAsStr(value, nonce) {
    let input = typeof value === 'object' && value !== null
        ? JSON.stringify(jsonabc.sortObj(value))
        : value;
    if (nonce) {
        input = nonce + input;
    }
    return hashStr(input);
}
exports.hashObjectAsStr = hashObjectAsStr;
function encryptAsymmetric(message, publicKeyA, secretKeyB) {
    const nonce = tweetnacl_1.default.randomBytes(24);
    const box = tweetnacl_1.default.box(coToUInt8(message, true), nonce, coToUInt8(publicKeyA), coToUInt8(secretKeyB));
    return { box, nonce };
}
exports.encryptAsymmetric = encryptAsymmetric;
function encryptAsymmetricAsStr(message, publicKeyA, secretKeyB) {
    const encrypted = encryptAsymmetric(message, publicKeyA, secretKeyB);
    const box = util_1.u8aToHex(encrypted.box);
    const nonce = util_1.u8aToHex(encrypted.nonce);
    return { box, nonce };
}
exports.encryptAsymmetricAsStr = encryptAsymmetricAsStr;
function decryptAsymmetric(data, publicKeyB, secretKeyA) {
    const decrypted = tweetnacl_1.default.box.open(coToUInt8(data.box), coToUInt8(data.nonce), coToUInt8(publicKeyB), coToUInt8(secretKeyA));
    return decrypted;
}
exports.decryptAsymmetric = decryptAsymmetric;
function decryptAsymmetricAsStr(data, publicKeyB, secretKeyA) {
    const result = decryptAsymmetric(data, coToUInt8(publicKeyB), coToUInt8(secretKeyA));
    return result ? util_1.u8aToString(result) : false;
}
exports.decryptAsymmetricAsStr = decryptAsymmetricAsStr;
//# sourceMappingURL=Crypto.js.map