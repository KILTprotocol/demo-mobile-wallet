"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorHandler_1 = require("./ErrorHandler");
const ExtrinsicError_1 = require("./ExtrinsicError");
describe('ErrorHandler', () => {
    it('test extrinsic failed', () => {
        // @ts-ignore
        const evtRecord = {
            phase: {
                asApplyExtrinsic: {
                    isEmpty: false,
                },
            },
            event: {
                index: {
                    toHex: jest.fn(() => {
                        return '0x0001';
                    }),
                },
            },
        };
        const submittableResult = {
            // @ts-ignore
            events: [evtRecord],
        };
        expect(ErrorHandler_1.ErrorHandler.extrinsicFailed(submittableResult)).toBeTruthy();
    });
    it('test extrinsic succeeded', () => {
        // @ts-ignore
        const evtRecord = {
            phase: {
                asApplyExtrinsic: {
                    isEmpty: false,
                },
            },
            event: {
                index: {
                    toHex: jest.fn(() => {
                        return '0x0000';
                    }),
                },
            },
        };
        const submittableResult = {
            // @ts-ignore
            events: [evtRecord],
        };
        expect(ErrorHandler_1.ErrorHandler.extrinsicFailed(submittableResult)).toBeFalsy();
    });
    const modules = [
        {
            // @ts-ignore
            events: {
                isEmpty: false,
            },
            // @ts-ignore
            name: {
                toString: jest.fn(() => {
                    return 'system';
                }),
            },
        },
        {
            // @ts-ignore
            events: {
                isEmpty: true,
            },
            // @ts-ignore
            name: {
                toString: jest.fn(() => {
                    return 'balances';
                }),
            },
        },
        {
            // @ts-ignore
            events: {
                isEmpty: false,
            },
            // @ts-ignore
            name: {
                toString: jest.fn(() => {
                    return 'error';
                }),
            },
        },
    ];
    const apiPromise = {
        // @ts-ignore
        runtimeMetadata: {
            metadata: {
                asV2: {
                    modules,
                },
            },
        },
    };
    it('test get error module index', async () => {
        // @ts-ignore
        expect(await ErrorHandler_1.ErrorHandler.getErrorModuleIndex(apiPromise)).toBe(1);
    });
    it('test get extrinsic error', async () => {
        const errorHandler = new ErrorHandler_1.ErrorHandler(apiPromise);
        // @ts-ignore
        errorHandler.moduleIndex = 1;
        // @ts-ignore
        const errorCode = {
            toJSON: jest.fn(() => {
                return ExtrinsicError_1.ErrorCode.ERROR_CTYPE_NOT_FOUND;
            }),
        };
        const errorEventRecord = {
            phase: {
                asApplyExtrinsic: {
                    isEmpty: false,
                },
            },
            event: {
                index: [1],
                data: [errorCode],
            },
        };
        const submittableResult = {
            // @ts-ignore
            events: [errorEventRecord],
        };
        // @ts-ignore
        expect(errorHandler.getExtrinsicError(submittableResult)).toBe(ExtrinsicError_1.ERROR_CTYPE_NOT_FOUND);
    });
});
//# sourceMappingURL=ErrorHandler.spec.js.map