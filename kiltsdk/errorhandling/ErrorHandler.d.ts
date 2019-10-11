/**
 * [[ErrorHandler]] helps spot and determine transaction errors.
 * @module ErrorHandling
 */
/**
 * Dummy comment needed for correct doc display, do not remove
 */
import { ApiPromise, SubmittableResult } from '@polkadot/api';
import { ExtrinsicError } from './ExtrinsicError';
export declare enum SystemEvent {
    ExtrinsicSuccess = "0x0000",
    ExtrinsicFailed = "0x0001"
}
export declare class ErrorHandler {
    private static readonly ERROR_MODULE_NAME;
    /**
     * Checks if there is `SystemEvent.ExtrinsicFailed` in the list of
     * transaction events within the given `extrinsicResult`.
     */
    static extrinsicFailed(extrinsicResult: SubmittableResult): boolean;
    constructor(apiPromise: ApiPromise);
    private moduleIndex;
    /**
     * Get the extrinsic error from the transaction result.
     *
     * @param extrinsicResult the transaction result
     */
    getExtrinsicError(extrinsicResult: SubmittableResult): ExtrinsicError | null;
    /**
     * Derive the module index from the metadata module descriptor.
     */
    private static getErrorModuleIndex;
}
