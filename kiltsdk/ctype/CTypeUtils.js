"use strict";
/**
 * @module CType
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/**
 * Dummy comment needed for correct doc display, do not remove.
 */
const ajv_1 = tslib_1.__importDefault(require("ajv"));
const CTypeSchema_1 = require("./CTypeSchema");
const CType_1 = tslib_1.__importDefault(require("./CType"));
const crypto_1 = tslib_1.__importDefault(require("../crypto"));
function verifySchemaWithErrors(model, metaModel, messages) {
    const ajv = new ajv_1.default();
    ajv.addMetaSchema(CTypeSchema_1.CTypeModel);
    const result = ajv.validate(metaModel, model);
    if (!result && ajv.errors) {
        if (messages) {
            ajv.errors.forEach((error) => {
                messages.push(error.message);
            });
        }
    }
    return !!result;
}
exports.verifySchemaWithErrors = verifySchemaWithErrors;
function verifySchema(model, metaModel) {
    return verifySchemaWithErrors(model, metaModel);
}
exports.verifySchema = verifySchema;
function verifyClaimStructure(claim, schema) {
    if (!verifySchema(schema, CTypeSchema_1.CTypeModel)) {
        throw new Error('CType does not correspond to schema');
    }
    return verifySchema(claim, schema);
}
exports.verifyClaimStructure = verifyClaimStructure;
function getHashForSchema(schema) {
    return crypto_1.default.hashObjectAsStr(schema);
}
exports.getHashForSchema = getHashForSchema;
/**
 * Create the CTYPE model from a CTYPE input model (used in CTYPE editing components).
 * This is necessary because component editors rely on editing arrays of properties instead of
 * arbitrary properties of an object. Additionally the default language translations are integrated
 * into the input model and need to be separated for the CTYPE model.
 * This is the reverse function of CType.getCTypeInputModel(...).
 * @returns The CTYPE for the input model.
 */
function fromInputModel(ctypeInput) {
    if (!verifySchema(ctypeInput, CTypeSchema_1.CTypeInputModel)) {
        throw new Error('CType input does not correspond to input model schema');
    }
    const ctype = {
        schema: {
            $id: ctypeInput.$id,
            $schema: CTypeSchema_1.CTypeModel.properties.$schema.default,
            properties: {},
            type: 'object',
        },
        metadata: {
            title: {
                default: ctypeInput.title,
            },
            description: {
                default: ctypeInput.description,
            },
            properties: {},
        },
    };
    const properties = {};
    ctypeInput.properties.forEach((p) => {
        const { title, $id } = p, rest = tslib_1.__rest(p, ["title", "$id"]);
        properties[$id] = rest;
        ctype.metadata.properties[$id] = {
            title: {
                default: title,
            },
        };
    });
    ctype.schema.properties = properties;
    return new CType_1.default(ctype);
}
exports.fromInputModel = fromInputModel;
function getLocalized(o, lang) {
    if (lang == null || !o[lang]) {
        return o.default;
    }
    return o[lang];
}
/**
 * Create the CTYPE input model for a CTYPE editing component form the CTYPE model.
 * This is necessary because component editors rely on editing arrays of properties instead of
 * arbitrary properties of an object. Additionally the default language translations are integrated
 * into the input model. This is the reverse function of CType.fromInputModel(...).
 * @returns The CTYPE input model.
 */
function getCTypeInputModel(ctype) {
    // create clone
    const result = JSON.parse(JSON.stringify(ctype.schema));
    result.$schema = CTypeSchema_1.CTypeInputModel.$id;
    result.title = getLocalized(ctype.metadata.title);
    result.description = getLocalized(ctype.metadata.description);
    result.required = [];
    result.properties = [];
    Object.entries(ctype.schema.properties).forEach(([key, value]) => {
        result.properties.push({
            title: getLocalized(ctype.metadata.properties[key].title),
            $id: key,
            type: value.type,
        });
        result.required.push(key);
    });
    return result;
}
exports.getCTypeInputModel = getCTypeInputModel;
/**
 * This method creates an input model for a claim from a CTYPE.
 * It selects translations for a specific language from the localized part of the CTYPE meta data.
 * @param {string} lang the language to choose translations for
 * @returns {any} The claim input model
 */
function getClaimInputModel(ctype, lang) {
    // create clone
    const result = JSON.parse(JSON.stringify(ctype.schema));
    result.title = getLocalized(ctype.metadata.title, lang);
    result.description = getLocalized(ctype.metadata.description, lang);
    result.required = [];
    Object.entries(ctype.metadata.properties).forEach(([key, value]) => {
        result.properties[key].title = getLocalized(value.title, lang);
        result.required.push(key);
    });
    return result;
}
exports.getClaimInputModel = getClaimInputModel;
//# sourceMappingURL=CTypeUtils.js.map