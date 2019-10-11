"use strict";
/**
 * @module SDK
 * @ignore
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/**
 * Dummy comment, so that typedoc ignores this file
 */
const Kilt_1 = require("./kilt/Kilt");
const BlockchainApiConnection = tslib_1.__importStar(require("./blockchainApiConnection"));
exports.BlockchainApiConnection = BlockchainApiConnection;
const Balance = tslib_1.__importStar(require("./balance/Balance.chain"));
exports.Balance = Balance;
const Identity_1 = tslib_1.__importDefault(require("./identity/Identity"));
exports.Identity = Identity_1.default;
const PublicIdentity_1 = tslib_1.__importDefault(require("./identity/PublicIdentity"));
exports.PublicIdentity = PublicIdentity_1.default;
const CType_1 = tslib_1.__importDefault(require("./ctype/CType"));
exports.CType = CType_1.default;
const CTypeUtils = tslib_1.__importStar(require("./ctype/CTypeUtils"));
exports.CTypeUtils = CTypeUtils;
const Claim_1 = tslib_1.__importDefault(require("./claim/Claim"));
exports.Claim = Claim_1.default;
const RequestForAttestation_1 = tslib_1.__importDefault(require("./requestforattestation/RequestForAttestation"));
exports.RequestForAttestation = RequestForAttestation_1.default;
const Attestation_1 = tslib_1.__importDefault(require("./attestation/Attestation"));
exports.Attestation = Attestation_1.default;
const AttestedClaim_1 = tslib_1.__importDefault(require("./attestedclaim/AttestedClaim"));
exports.AttestedClaim = AttestedClaim_1.default;
const Delegation_1 = tslib_1.__importDefault(require("./delegation/Delegation"));
exports.DelegationBaseNode = Delegation_1.default;
const DelegationNode_1 = tslib_1.__importDefault(require("./delegation/DelegationNode"));
exports.DelegationNode = DelegationNode_1.default;
const DelegationRootNode_1 = tslib_1.__importDefault(require("./delegation/DelegationRootNode"));
exports.DelegationRootNode = DelegationRootNode_1.default;
const Did_1 = tslib_1.__importDefault(require("./did/Did"));
exports.Did = Did_1.default;
const Message_1 = tslib_1.__importDefault(require("./messaging/Message"));
exports.Message = Message_1.default;
var Blockchain_1 = require("./blockchain/Blockchain");
exports.Blockchain = Blockchain_1.default;
var TxStatus_1 = require("./blockchain/TxStatus");
exports.TxStatus = TxStatus_1.default;
var crypto_1 = require("./crypto");
exports.Crypto = crypto_1.default;
var UUID_1 = require("./util/UUID");
exports.UUID = UUID_1.default;
tslib_1.__exportStar(require("./errorhandling/ExtrinsicError"), exports);
var Delegation_2 = require("./types/Delegation");
exports.Permission = Delegation_2.Permission;
var CTypeSchema_1 = require("./ctype/CTypeSchema");
exports.CTypeModel = CTypeSchema_1.CTypeModel;
exports.CTypeInputModel = CTypeSchema_1.CTypeInputModel;
exports.CTypeWrapperModel = CTypeSchema_1.CTypeWrapperModel;
tslib_1.__exportStar(require("./messaging/Message"), exports);
// ---- Default export for ease of use ----
exports.default = {
    connect: Kilt_1.connect,
    Balance,
    Identity: Identity_1.default,
    PublicIdentity: PublicIdentity_1.default,
    CType: CType_1.default,
    Claim: Claim_1.default,
    RequestForAttestation: RequestForAttestation_1.default,
    Attestation: Attestation_1.default,
    AttestedClaim: AttestedClaim_1.default,
    DelegationNode: DelegationNode_1.default,
    DelegationRootNode: DelegationRootNode_1.default,
    Did: Did_1.default,
    Message: Message_1.default,
};
//# sourceMappingURL=index.js.map