/**
 * Universally unique identifiers (UUIDs) are needed in KILT to uniquely identify specific information.
 * ***
 * UUIDs are used for example in [[RequestForAttestation]] to generate hashes.
 * @module UUID
 */
/**
 * Generates a H256 compliant UUID.
 */
export declare function generate(): string;
declare const _default: {
    generate: typeof generate;
};
export default _default;
