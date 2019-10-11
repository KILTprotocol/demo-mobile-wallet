/**
 * @module CType
 */
/**
 * Dummy comment needed for correct doc display, do not remove.
 */
export declare const CTypeInputModel: {
    $schema: string;
    $id: string;
    title: string;
    type: string;
    properties: {
        $id: {
            title: string;
            type: string;
            format: string;
            minLength: number;
        };
        $schema: {
            title: string;
            type: string;
            format: string;
            enum: string[];
            default: string;
            readonly: boolean;
            className: string;
        };
        title: {
            title: string;
            type: string;
            minLength: number;
        };
        properties: {
            title: string;
            type: string;
            items: {
                type: string;
                properties: {
                    title: {
                        title: string;
                        type: string;
                        default: string;
                        minLength: number;
                    };
                    $id: {
                        title: string;
                        type: string;
                        format: string;
                        minLength: number;
                    };
                    type: {
                        title: string;
                        type: string;
                        enum: string[];
                        enumTitles: string[];
                    };
                    format: {
                        title: string;
                        type: string;
                        enum: string[];
                    };
                };
                required: string[];
            };
            collapsed: boolean;
        };
        type: {
            title: string;
            type: string;
            default: string;
            readonly: boolean;
            className: string;
        };
    };
    required: string[];
};
export declare const CTypeModel: {
    $schema: string;
    $id: string;
    type: string;
    properties: {
        $id: {
            type: string;
            minLength: number;
        };
        $schema: {
            type: string;
            format: string;
            default: string;
            enum: string[];
        };
        type: {
            type: string;
            enum: string[];
        };
        properties: {
            type: string;
            patternProperties: {
                '^.*$': {
                    type: string;
                    properties: {
                        type: {
                            type: string;
                            enum: string[];
                        };
                        format: {
                            type: string;
                            enum: string[];
                        };
                    };
                    required: string[];
                };
            };
        };
    };
    required: string[];
};
export declare const CTypeWrapperModel: {
    $schema: string;
    $id: string;
    type: string;
    properties: {
        schema: {
            type: string;
            properties: {
                $id: {
                    type: string;
                    minLength: number;
                };
                $schema: {
                    type: string;
                    format: string;
                    default: string;
                    enum: string[];
                };
                type: {
                    type: string;
                    enum: string[];
                };
                properties: {
                    type: string;
                    patternProperties: {
                        '^.*$': {
                            type: string;
                            properties: {
                                type: {
                                    type: string;
                                    enum: string[];
                                };
                                format: {
                                    type: string;
                                    enum: string[];
                                };
                            };
                            required: string[];
                        };
                    };
                };
            };
        };
        hash: {
            type: string;
            minLength: number;
        };
        metamodel: {
            type: string;
            properties: {};
            patternProperties: {
                '^.*$': {
                    type: string;
                    properties: {};
                };
            };
        };
    };
    required: string[];
};
