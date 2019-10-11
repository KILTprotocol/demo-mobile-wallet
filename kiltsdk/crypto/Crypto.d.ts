/**
 * Crypto provides KILT with the utility types and methods useful for cryptographic operations, such as signing/verifying, encrypting/decrypting and hashing.
 * ***
 * The utility types and methods are wrappers for existing Polkadot functions and imported throughout KILT's protocol for various cryptographic needs.
 * @module Crypto
 * @preferred
 */
/// <reference types="node" />
/**
 * Dummy comment needed for correct doc display, do not remove
 */
import { decodeAddress, encodeAddress } from '@polkadot/keyring/address';
import { KeyringPair } from '@polkadot/keyring/types';
import { u8aConcat, u8aToHex } from '@polkadot/util';
export { encodeAddress, decodeAddress, u8aToHex, u8aConcat };
export declare type CryptoInput = Buffer | Uint8Array | string;
export declare type Address = string;
export declare type EncryptedSymmetric = {
    encrypted: Uint8Array;
    nonce: Uint8Array;
};
export declare type EncryptedAsymmetric = {
    box: Uint8Array;
    nonce: Uint8Array;
};
export declare type EncryptedSymmetricString = {
    encrypted: string;
    nonce: string;
};
export declare type EncryptedAsymmetricString = {
    box: string;
    nonce: string;
};
export declare function coToUInt8(input: CryptoInput, rawConvert?: boolean): Uint8Array;
export declare function sign(message: CryptoInput, signKeyPair: KeyringPair): Uint8Array;
export declare function signStr(message: CryptoInput, signKeyPair: KeyringPair): string;
export declare function verify(message: CryptoInput, signature: CryptoInput, address: Address): boolean;
export declare function encryptSymmetric(message: CryptoInput, secret: CryptoInput, nonce?: CryptoInput): EncryptedSymmetric;
export declare function encryptSymmetricAsStr(message: CryptoInput, secret: CryptoInput, inputNonce?: CryptoInput): EncryptedSymmetricString;
export declare function decryptSymmetric(data: EncryptedSymmetric | EncryptedSymmetricString, secret: CryptoInput): Uint8Array | null;
export declare function decryptSymmetricStr(data: EncryptedSymmetric | EncryptedSymmetricString, secret: CryptoInput): string | null;
export declare function hash(value: CryptoInput, bitLength?: number): Uint8Array;
export declare function hashStr(value: CryptoInput): string;
export declare function hashObjectAsStr(value: object | string, nonce?: string): string;
export declare function encryptAsymmetric(message: CryptoInput, publicKeyA: CryptoInput, secretKeyB: CryptoInput): EncryptedAsymmetric;
export declare function encryptAsymmetricAsStr(message: CryptoInput, publicKeyA: CryptoInput, secretKeyB: CryptoInput): EncryptedAsymmetricString;
export declare function decryptAsymmetric(data: EncryptedAsymmetric | EncryptedAsymmetricString, publicKeyB: CryptoInput, secretKeyA: CryptoInput): Uint8Array | false;
export declare function decryptAsymmetricAsStr(data: EncryptedAsymmetric | EncryptedAsymmetricString, publicKeyB: CryptoInput, secretKeyA: CryptoInput): string | false;
