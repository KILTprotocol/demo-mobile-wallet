"use strict";
/**
 * ExtrinsicErrors are KILT-specific errors, with associated codes and descriptions.
 * @module ErrorHandling/ExtrinsicErrors
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Dummy comment needed for correct doc display, do not remove
 */
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["ERROR_CTYPE_NOT_FOUND"] = 1001] = "ERROR_CTYPE_NOT_FOUND";
    ErrorCode[ErrorCode["ERROR_CTYPE_ALREADY_EXISTS"] = 1002] = "ERROR_CTYPE_ALREADY_EXISTS";
    ErrorCode[ErrorCode["ERROR_ALREADY_ATTESTED"] = 2001] = "ERROR_ALREADY_ATTESTED";
    ErrorCode[ErrorCode["ERROR_ALREADY_REVOKED"] = 2002] = "ERROR_ALREADY_REVOKED";
    ErrorCode[ErrorCode["ERROR_ATTESTATION_NOT_FOUND"] = 2003] = "ERROR_ATTESTATION_NOT_FOUND";
    ErrorCode[ErrorCode["ERROR_DELEGATION_REVOKED"] = 2004] = "ERROR_DELEGATION_REVOKED";
    ErrorCode[ErrorCode["ERROR_NOT_DELEGATED_TO_ATTESTER"] = 2005] = "ERROR_NOT_DELEGATED_TO_ATTESTER";
    ErrorCode[ErrorCode["ERROR_DELEGATION_NOT_AUTHORIZED_TO_ATTEST"] = 2006] = "ERROR_DELEGATION_NOT_AUTHORIZED_TO_ATTEST";
    ErrorCode[ErrorCode["ERROR_CTYPE_OF_DELEGATION_NOT_MATCHING"] = 2007] = "ERROR_CTYPE_OF_DELEGATION_NOT_MATCHING";
    ErrorCode[ErrorCode["ERROR_NOT_PERMITTED_TO_REVOKE_ATTESTATION"] = 2008] = "ERROR_NOT_PERMITTED_TO_REVOKE_ATTESTATION";
    ErrorCode[ErrorCode["ERROR_ROOT_ALREADY_EXISTS"] = 3001] = "ERROR_ROOT_ALREADY_EXISTS";
    ErrorCode[ErrorCode["ERROR_NOT_PERMITTED_TO_REVOKE"] = 3002] = "ERROR_NOT_PERMITTED_TO_REVOKE";
    ErrorCode[ErrorCode["ERROR_DELEGATION_NOT_FOUND"] = 3003] = "ERROR_DELEGATION_NOT_FOUND";
    ErrorCode[ErrorCode["ERROR_DELEGATION_ALREADY_EXISTS"] = 3004] = "ERROR_DELEGATION_ALREADY_EXISTS";
    ErrorCode[ErrorCode["ERROR_BAD_DELEGATION_SIGNATURE"] = 3005] = "ERROR_BAD_DELEGATION_SIGNATURE";
    ErrorCode[ErrorCode["ERROR_NOT_OWNER_OF_PARENT"] = 3006] = "ERROR_NOT_OWNER_OF_PARENT";
    ErrorCode[ErrorCode["ERROR_NOT_AUTHORIZED_TO_DELEGATE"] = 3007] = "ERROR_NOT_AUTHORIZED_TO_DELEGATE";
    ErrorCode[ErrorCode["ERROR_PARENT_NOT_FOUND"] = 3008] = "ERROR_PARENT_NOT_FOUND";
    ErrorCode[ErrorCode["ERROR_NOT_OWNER_OF_ROOT"] = 3009] = "ERROR_NOT_OWNER_OF_ROOT";
    ErrorCode[ErrorCode["ERROR_ROOT_NOT_FOUND"] = 3100] = "ERROR_ROOT_NOT_FOUND";
    ErrorCode[ErrorCode["ERROR_UNKNOWN"] = -1] = "ERROR_UNKNOWN";
})(ErrorCode = exports.ErrorCode || (exports.ErrorCode = {}));
class ExtrinsicError extends Error {
    constructor(errorCode, message) {
        super(message);
        this.errorCode = errorCode;
    }
}
exports.ExtrinsicError = ExtrinsicError;
exports.ERROR_CTYPE_NOT_FOUND = new ExtrinsicError(ErrorCode.ERROR_CTYPE_NOT_FOUND, 'CTYPE not found');
exports.ERROR_CTYPE_ALREADY_EXISTS = new ExtrinsicError(ErrorCode.ERROR_CTYPE_ALREADY_EXISTS, 'CTYPE already exists');
exports.ERROR_ALEADY_ATTESTED = new ExtrinsicError(ErrorCode.ERROR_ALREADY_ATTESTED, 'already attested');
exports.ERROR_ERROR_ALREADY_REVOKED = new ExtrinsicError(ErrorCode.ERROR_ALREADY_REVOKED, 'already revoked');
exports.ERROR_ATTESTATION_NOT_FOUND = new ExtrinsicError(ErrorCode.ERROR_ATTESTATION_NOT_FOUND, 'attestation not found');
exports.ERROR_DELEGATION_REVOKED = new ExtrinsicError(ErrorCode.ERROR_DELEGATION_REVOKED, 'delegation is revoked');
exports.ERROR_NOT_DELEGATED_TO_ATTESTER = new ExtrinsicError(ErrorCode.ERROR_NOT_DELEGATED_TO_ATTESTER, 'not delegated to attester');
exports.ERROR_DELEGATION_NOT_AUTHORIZED_TO_ATTEST = new ExtrinsicError(ErrorCode.ERROR_DELEGATION_NOT_AUTHORIZED_TO_ATTEST, 'delegation not authorized to attest');
exports.ERROR_CTYPE_OF_DELEGATION_NOT_MATCHING = new ExtrinsicError(ErrorCode.ERROR_CTYPE_OF_DELEGATION_NOT_MATCHING, 'CTYPE of delegation does not match');
exports.ERROR_NOT_PERMITTED_TO_REVOKE_ATTESTATION = new ExtrinsicError(ErrorCode.ERROR_NOT_PERMITTED_TO_REVOKE_ATTESTATION, 'not permitted to revoke attestation');
exports.ERROR_ROOT_ALREADY_EXISTS = new ExtrinsicError(ErrorCode.ERROR_ROOT_ALREADY_EXISTS, 'root already exist');
exports.ERROR_NOT_PERMITTED_TO_REVOKE = new ExtrinsicError(ErrorCode.ERROR_NOT_PERMITTED_TO_REVOKE, 'not permitted to revoke');
exports.ERROR_DELEGATION_NOT_FOUND = new ExtrinsicError(ErrorCode.ERROR_DELEGATION_NOT_FOUND, 'delegation not found');
exports.ERROR_DELEGATION_ALREADY_EXISTS = new ExtrinsicError(ErrorCode.ERROR_DELEGATION_ALREADY_EXISTS, 'delegation already exist');
exports.ERROR_BAD_DELEGATION_SIGNATURE = new ExtrinsicError(ErrorCode.ERROR_BAD_DELEGATION_SIGNATURE, 'bad delegate signature');
exports.ERROR_NOT_OWNER_OF_PARENT = new ExtrinsicError(ErrorCode.ERROR_NOT_OWNER_OF_PARENT, 'not owner of parent');
exports.ERROR_NOT_AUTHORIZED_TO_DELEGATE = new ExtrinsicError(ErrorCode.ERROR_NOT_AUTHORIZED_TO_DELEGATE, 'not authorized to delegate');
exports.ERROR_PARENT_NOT_FOUND = new ExtrinsicError(ErrorCode.ERROR_PARENT_NOT_FOUND, 'parent not found');
exports.ERROR_NOT_OWNER_OF_ROOT = new ExtrinsicError(ErrorCode.ERROR_NOT_OWNER_OF_ROOT, 'not owner of root');
exports.ERROR_ROOT_NOT_FOUND = new ExtrinsicError(ErrorCode.ERROR_ROOT_NOT_FOUND, 'root not found');
exports.ERROR_UNKNOWN = new ExtrinsicError(ErrorCode.ERROR_UNKNOWN, 'an unknown error ocurred');
const errorsByCode = [];
[
    exports.ERROR_CTYPE_NOT_FOUND,
    exports.ERROR_CTYPE_ALREADY_EXISTS,
    exports.ERROR_ALEADY_ATTESTED,
    exports.ERROR_ERROR_ALREADY_REVOKED,
    exports.ERROR_ATTESTATION_NOT_FOUND,
    exports.ERROR_DELEGATION_REVOKED,
    exports.ERROR_NOT_DELEGATED_TO_ATTESTER,
    exports.ERROR_DELEGATION_NOT_AUTHORIZED_TO_ATTEST,
    exports.ERROR_CTYPE_OF_DELEGATION_NOT_MATCHING,
    exports.ERROR_NOT_PERMITTED_TO_REVOKE_ATTESTATION,
    exports.ERROR_ROOT_ALREADY_EXISTS,
    exports.ERROR_NOT_PERMITTED_TO_REVOKE,
    exports.ERROR_DELEGATION_NOT_FOUND,
    exports.ERROR_DELEGATION_ALREADY_EXISTS,
    exports.ERROR_BAD_DELEGATION_SIGNATURE,
    exports.ERROR_NOT_OWNER_OF_PARENT,
    exports.ERROR_NOT_AUTHORIZED_TO_DELEGATE,
    exports.ERROR_PARENT_NOT_FOUND,
    exports.ERROR_NOT_OWNER_OF_ROOT,
    exports.ERROR_ROOT_NOT_FOUND,
    exports.ERROR_UNKNOWN,
].forEach(value => {
    errorsByCode[value.errorCode] = value;
});
function errorForCode(errorCode) {
    return errorsByCode[errorCode];
}
exports.errorForCode = errorForCode;
//# sourceMappingURL=ExtrinsicError.js.map