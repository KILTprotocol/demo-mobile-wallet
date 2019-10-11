/**
 * Identities are a core building block of the KILT SDK.
 * An Identity object represent an **entity** - be it a person, an organization, a machine or some other entity.
 *
 * An Identity object can be built via a seed phrase or other. It has a signature keypair, an associated public address, and an encryption ("boxing") keypair. These are needed to:
 * * create a signed [[Claim]], an [[Attestation]] or other (and verify these later).
 * * encrypt messages between participants.
 *
 * Note: A [[PublicIdentity]] object exposes only public information such as the public address, but doesn't expose any secrets such as private keys.
 *
 * @module Identity
 * @preferred
 */
/**
 * Dummy comment needed for correct doc display, do not remove.
 */
import { SubmittableExtrinsic } from '@polkadot/api/SubmittableExtrinsic';
import { SubscriptionResult, CodecResult } from '@polkadot/api/promise/types';
import Crypto from '../crypto';
import { CryptoInput, EncryptedAsymmetric, EncryptedAsymmetricString } from '../crypto/Crypto';
import PublicIdentity from './PublicIdentity';
declare type BoxPublicKey = PublicIdentity['boxPublicKeyAsHex'] | Identity['boxKeyPair']['publicKey'];
export default class Identity extends PublicIdentity {
    private static ADDITIONAL_ENTROPY_FOR_HASHING;
    /**
     * [STATIC] Generates Mnemonic phrase used to create identities from phrase seed.
     *
     * @returns Randomly generated [[BIP39]](https://www.npmjs.com/package/bip39) mnemonic phrase (Secret phrase).
     * @example
     * ```javascript
     * Identity.generateMnemonic();
     * // returns: "coast ugly state lunch repeat step armed goose together pottery bind mention"
     * ```
     */
    static generateMnemonic(): string;
    /**
     * [STATIC] Builds an identity object from a mnemonic string.
     *
     * @param phraseArg - [[BIP39]](https://www.npmjs.com/package/bip39) Mnemonic word phrase (Secret phrase).
     * @returns An [[Identity]].
     *
     * @example
     * ```javascript
     * Identity.buildFromMnemonic(mnemonic);
     * ```
     */
    static buildFromMnemonic(phraseArg?: string): Identity;
    /**
     * [STATIC] Builds an [[Identity]], generated from a seed hex string.
     *
     * @param seedArg - Seed as hex string (Starting with 0x).
     * @returns  An [[Identity]]
     * @example
     * ```javascript
     * Identity.buildFromSeedString(seed);
     * ```
     */
    static buildFromSeedString(seedArg: string): Identity;
    /**
     * [STATIC] Builds a new [[Identity]], generated from a seed (Secret Seed).
     *
     * @param seed - A seed as an Uint8Array with 24 arbitrary numbers.
     * @returns An [[Identity]].
     * @example
     * ```javascript
     * Identity.buildFromSeed(seed);
     * ```
     */
    static buildFromSeed(seed: Uint8Array): Identity;
    /**
     * [STATIC] Builds a new [[Identity]], generated from a uniform resource identifier (URI).
     *
     * @param uri - Standard identifiers.
     * @returns  An [[Identity]].
     * @example
     * ```javascript
     * Identity.buildFromURI('//Bob');
     * ```
     */
    static buildFromURI(uri: string): Identity;
    readonly seed: Uint8Array;
    readonly seedAsHex: string;
    readonly signPublicKeyAsHex: string;
    private constructor();
    private readonly signKeyringPair;
    private readonly boxKeyPair;
    /**
     * Returns the [[PublicIdentity]] (identity's address and public key) of the Identity.
     * Can be given to third-parties to communicate and process signatures.
     *
     * @returns The [[PublicIdentity]], corresponding to the [[Identity]].
     * @example
     * ```javascript
     * // provides a PublicIdentity
     * identity.getPublicIdentity();
     * ```
     */
    getPublicIdentity(): PublicIdentity;
    /**
     * Signs data with an [[Identity]] object's key.
     *
     * @param cryptoInput - The data to be signed.
     * @returns The signed data.
     * @example
     * ```javascript
     * identity.sign(data);
     * ```
     */
    sign(cryptoInput: CryptoInput): Uint8Array;
    /**
     * Signs data with an [[Identity]] object's key returns it as string.
     *
     * @param cryptoInput - The data to be signed.
     * @returns The signed data.
     * @example
     * ```javascript
     * identity.signStr(data);
     * ```
     */
    signStr(cryptoInput: CryptoInput): string;
    /**
     * Encrypts data asymmetrically and returns it as string.
     *
     * @param cryptoInput - The data to be encrypted.
     * @param boxPublicKey - The public key of the receiver of the encrypted data.
     * @returns The encrypted data.
     * @example
     * ```javascript
     * identity.encryptAsymmetricAsStr(messageStr, PublicIdentity.boxPublicKeyAsHex);
     * ```
     */
    encryptAsymmetricAsStr(cryptoInput: CryptoInput, boxPublicKey: BoxPublicKey): Crypto.EncryptedAsymmetricString;
    /**
     * Decrypts data asymmetrical and returns it as string.
     *
     * @param encrypted - The encrypted data.
     * @param boxPublicKey - The public key of the sender of the encrypted data.
     * @returns The decrypted data.
     * @example
     * ```javascript
     * identity.decryptAsymmetricAsStr(encryptedData, PublicIdentity.boxPublicKeyAsHex);
     * // decrypted data
     * ```
     */
    decryptAsymmetricAsStr(encrypted: EncryptedAsymmetric | EncryptedAsymmetricString, boxPublicKey: BoxPublicKey): string | false;
    /**
     * Encrypts data asymmetrically and returns it as a byte array.
     *
     * @param input - The data to be encrypted.
     * @param boxPublicKey - The public key of the receiver of the encrypted data.
     * @returns The encrypted data.
     * @example
     * ```javascript
     * identity.encryptAsymmetric(data, PublicIdentity.boxPublicKeyAsHex);
     * // encrypted data
     * ```
     */
    encryptAsymmetric(input: CryptoInput, boxPublicKey: BoxPublicKey): Crypto.EncryptedAsymmetric;
    /**
     * Decrypts data asymmetrical and returns it as a byte array.
     *
     * @param encrypted - The encrypted data.
     * @param boxPublicKey - The public key of the sender of the encrypted data.
     * @returns The decrypted data.
     * @example
     * ```javascript
     * identity.decryptAsymmetric(encryptedData, PublicIdentity.boxPublicKeyAsHex);
     * // decrypted data
     * ```
     */
    decryptAsymmetric(encrypted: EncryptedAsymmetric | EncryptedAsymmetricString, boxPublicKey: BoxPublicKey): false | Uint8Array;
    /**
     * Signs a submittable extrinsic (transaction), in preparation to pushing it to the blockchain.
     *
     * @param submittableExtrinsic - A chain transaction.
     * @param nonceAsHex - The nonce of the address operating the transaction.
     * @returns The signed SubmittableExtrinsic.
     * @example
     * ```javascript
     * identity.signSubmittableExtrinsic(tx, nonce.tohex());
     * // A signed chain transaction
     * ```
     */
    signSubmittableExtrinsic(submittableExtrinsic: SubmittableExtrinsic<CodecResult, SubscriptionResult>, nonceAsHex: string): SubmittableExtrinsic<CodecResult, SubscriptionResult>;
    private static createBoxKeyPair;
}
export {};
