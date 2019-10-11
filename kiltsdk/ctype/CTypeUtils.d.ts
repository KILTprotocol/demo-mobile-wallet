/**
 * @module CType
 */
import CType from './CType';
import ICType from '../types/CType';
export declare function verifySchemaWithErrors(model: any, metaModel: any, messages?: string[]): boolean;
export declare function verifySchema(model: any, metaModel: any): boolean;
export declare function verifyClaimStructure(claim: any, schema: any): boolean;
export declare function getHashForSchema(schema: ICType['schema']): string;
/**
 * Create the CTYPE model from a CTYPE input model (used in CTYPE editing components).
 * This is necessary because component editors rely on editing arrays of properties instead of
 * arbitrary properties of an object. Additionally the default language translations are integrated
 * into the input model and need to be separated for the CTYPE model.
 * This is the reverse function of CType.getCTypeInputModel(...).
 * @returns The CTYPE for the input model.
 */
export declare function fromInputModel(ctypeInput: any): CType;
/**
 * Create the CTYPE input model for a CTYPE editing component form the CTYPE model.
 * This is necessary because component editors rely on editing arrays of properties instead of
 * arbitrary properties of an object. Additionally the default language translations are integrated
 * into the input model. This is the reverse function of CType.fromInputModel(...).
 * @returns The CTYPE input model.
 */
export declare function getCTypeInputModel(ctype: CType): any;
/**
 * This method creates an input model for a claim from a CTYPE.
 * It selects translations for a specific language from the localized part of the CTYPE meta data.
 * @param {string} lang the language to choose translations for
 * @returns {any} The claim input model
 */
export declare function getClaimInputModel(ctype: ICType, lang?: string): any;
