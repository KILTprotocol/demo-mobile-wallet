"use strict";
/**
 * [[ErrorHandler]] helps spot and determine transaction errors.
 * @module ErrorHandling
 */
Object.defineProperty(exports, "__esModule", { value: true });
const ConfigLog_1 = require("../config/ConfigLog");
const ExtrinsicError_1 = require("./ExtrinsicError");
const log = ConfigLog_1.factory.getLogger('Blockchain');
var SystemEvent;
(function (SystemEvent) {
    SystemEvent["ExtrinsicSuccess"] = "0x0000";
    SystemEvent["ExtrinsicFailed"] = "0x0001";
})(SystemEvent = exports.SystemEvent || (exports.SystemEvent = {}));
class ErrorHandler {
    constructor(apiPromise) {
        this.moduleIndex = -1;
        ErrorHandler.getErrorModuleIndex(apiPromise).then((moduleIndex) => {
            this.moduleIndex = moduleIndex;
        });
    }
    /**
     * Checks if there is `SystemEvent.ExtrinsicFailed` in the list of
     * transaction events within the given `extrinsicResult`.
     */
    static extrinsicFailed(extrinsicResult) {
        const events = extrinsicResult.events || [];
        return (events.find((eventRecord) => {
            return (!eventRecord.phase.asApplyExtrinsic.isEmpty &&
                eventRecord.event.index.toHex() === SystemEvent.ExtrinsicFailed);
        }) !== undefined);
    }
    /**
     * Get the extrinsic error from the transaction result.
     *
     * @param extrinsicResult the transaction result
     */
    getExtrinsicError(extrinsicResult) {
        const events = extrinsicResult.events || [];
        const errorEvent = events.find((eventRecord) => {
            const eventIndex = eventRecord.event.index;
            return (!eventRecord.phase.asApplyExtrinsic.isEmpty &&
                eventIndex[0] === this.moduleIndex);
        });
        if (errorEvent) {
            const { data } = errorEvent.event;
            const errorCode = data && !data.isEmpty ? data[0].toJSON() : null;
            if (errorCode) {
                return ExtrinsicError_1.errorForCode(errorCode);
            }
            log.warn(`error event doesn't have a valid error code: ${data}`);
        }
        else {
            log.warn('no error event found in transaction result');
        }
        return null;
    }
    /**
     * Derive the module index from the metadata module descriptor.
     */
    static async getErrorModuleIndex(apiPromise) {
        // @ts-ignore
        const modules = await apiPromise.runtimeMetadata.metadata
            .asV2.modules;
        const filtered = modules.filter((mod) => {
            return !mod.events.isEmpty;
        });
        return filtered
            .map(m => m.name.toString())
            .indexOf(ErrorHandler.ERROR_MODULE_NAME);
    }
}
ErrorHandler.ERROR_MODULE_NAME = 'error';
exports.ErrorHandler = ErrorHandler;
//# sourceMappingURL=ErrorHandler.js.map