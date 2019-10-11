/**
 * ExtrinsicErrors are KILT-specific errors, with associated codes and descriptions.
 * @module ErrorHandling/ExtrinsicErrors
 */
/**
 * Dummy comment needed for correct doc display, do not remove
 */
export declare enum ErrorCode {
    ERROR_CTYPE_NOT_FOUND = 1001,
    ERROR_CTYPE_ALREADY_EXISTS = 1002,
    ERROR_ALREADY_ATTESTED = 2001,
    ERROR_ALREADY_REVOKED = 2002,
    ERROR_ATTESTATION_NOT_FOUND = 2003,
    ERROR_DELEGATION_REVOKED = 2004,
    ERROR_NOT_DELEGATED_TO_ATTESTER = 2005,
    ERROR_DELEGATION_NOT_AUTHORIZED_TO_ATTEST = 2006,
    ERROR_CTYPE_OF_DELEGATION_NOT_MATCHING = 2007,
    ERROR_NOT_PERMITTED_TO_REVOKE_ATTESTATION = 2008,
    ERROR_ROOT_ALREADY_EXISTS = 3001,
    ERROR_NOT_PERMITTED_TO_REVOKE = 3002,
    ERROR_DELEGATION_NOT_FOUND = 3003,
    ERROR_DELEGATION_ALREADY_EXISTS = 3004,
    ERROR_BAD_DELEGATION_SIGNATURE = 3005,
    ERROR_NOT_OWNER_OF_PARENT = 3006,
    ERROR_NOT_AUTHORIZED_TO_DELEGATE = 3007,
    ERROR_PARENT_NOT_FOUND = 3008,
    ERROR_NOT_OWNER_OF_ROOT = 3009,
    ERROR_ROOT_NOT_FOUND = 3100,
    ERROR_UNKNOWN = -1
}
export declare class ExtrinsicError extends Error {
    errorCode: ErrorCode;
    constructor(errorCode: ErrorCode, message: string);
}
export declare const ERROR_CTYPE_NOT_FOUND: ExtrinsicError;
export declare const ERROR_CTYPE_ALREADY_EXISTS: ExtrinsicError;
export declare const ERROR_ALEADY_ATTESTED: ExtrinsicError;
export declare const ERROR_ERROR_ALREADY_REVOKED: ExtrinsicError;
export declare const ERROR_ATTESTATION_NOT_FOUND: ExtrinsicError;
export declare const ERROR_DELEGATION_REVOKED: ExtrinsicError;
export declare const ERROR_NOT_DELEGATED_TO_ATTESTER: ExtrinsicError;
export declare const ERROR_DELEGATION_NOT_AUTHORIZED_TO_ATTEST: ExtrinsicError;
export declare const ERROR_CTYPE_OF_DELEGATION_NOT_MATCHING: ExtrinsicError;
export declare const ERROR_NOT_PERMITTED_TO_REVOKE_ATTESTATION: ExtrinsicError;
export declare const ERROR_ROOT_ALREADY_EXISTS: ExtrinsicError;
export declare const ERROR_NOT_PERMITTED_TO_REVOKE: ExtrinsicError;
export declare const ERROR_DELEGATION_NOT_FOUND: ExtrinsicError;
export declare const ERROR_DELEGATION_ALREADY_EXISTS: ExtrinsicError;
export declare const ERROR_BAD_DELEGATION_SIGNATURE: ExtrinsicError;
export declare const ERROR_NOT_OWNER_OF_PARENT: ExtrinsicError;
export declare const ERROR_NOT_AUTHORIZED_TO_DELEGATE: ExtrinsicError;
export declare const ERROR_PARENT_NOT_FOUND: ExtrinsicError;
export declare const ERROR_NOT_OWNER_OF_ROOT: ExtrinsicError;
export declare const ERROR_ROOT_NOT_FOUND: ExtrinsicError;
export declare const ERROR_UNKNOWN: ExtrinsicError;
export declare function errorForCode(errorCode: number): ExtrinsicError;
