/**
 * KILT participants can communicate via a 1:1 messaging system.
 * ***
 * All messages are **encrypted** with the encryption keys of the involved identities. Every time an actor sends data about an [[Identity]], they have to sign the message to prove access to the corresponding private key.
 * <br>
 * The [[Message]] class exposes methods to construct and verify messages.
 * @module Messaging
 */
/**
 * Dummy comment needed for correct doc display, do not remove
 */
import { Claim, DelegationNode, IAttestedClaim, IClaim, ICType, IDelegationBaseNode, IDelegationNode, Identity, IPublicIdentity, IRequestForAttestation } from '..';
/**
 * inReplyTo - should store the id of the parent message
 * references - should store the references or the in-reply-to of the parent-message followed by the message-id of the parent-message
 */
export interface IMessage {
    body: MessageBody;
    createdAt: number;
    receiverAddress: IPublicIdentity['address'];
    senderAddress: IPublicIdentity['address'];
    senderBoxPublicKey: IPublicIdentity['boxPublicKeyAsHex'];
    messageId?: string;
    receivedAt?: number;
    inReplyTo?: IMessage['messageId'];
    references?: Array<IMessage['messageId']>;
}
export interface IEncryptedMessage {
    messageId?: string;
    receivedAt?: number;
    message: string;
    nonce: string;
    createdAt: number;
    hash: string;
    signature: string;
    receiverAddress: IPublicIdentity['address'];
    senderAddress: IPublicIdentity['address'];
    senderBoxPublicKey: IPublicIdentity['boxPublicKeyAsHex'];
}
export declare enum MessageBodyType {
    REQUEST_LEGITIMATIONS = "request-legitimations",
    SUBMIT_LEGITIMATIONS = "submit-legitimations",
    REJECT_LEGITIMATIONS = "reject-legitimations",
    REQUEST_ATTESTATION_FOR_CLAIM = "request-attestation-for-claim",
    SUBMIT_ATTESTATION_FOR_CLAIM = "submit-attestation-for-claim",
    REJECT_ATTESTATION_FOR_CLAIM = "reject-attestation-for-claim",
    REQUEST_CLAIMS_FOR_CTYPES = "request-claims-for-ctypes",
    SUBMIT_CLAIMS_FOR_CTYPES = "submit-claims-for-ctypes",
    ACCEPT_CLAIMS_FOR_CTYPES = "accept-claims-for-ctypes",
    REJECT_CLAIMS_FOR_CTYPES = "reject-claims-for-ctypes",
    REQUEST_ACCEPT_DELEGATION = "request-accept-delegation",
    SUBMIT_ACCEPT_DELEGATION = "submit-accept-delegation",
    REJECT_ACCEPT_DELEGATION = "reject-accept-delegation",
    INFORM_CREATE_DELEGATION = "inform-create-delegation"
}
export default class Message implements IMessage {
    static ensureOwnerIsSender(message: IMessage): void;
    static ensureHashAndSignature(encrypted: IEncryptedMessage, senderAddress: IPublicIdentity['address']): void;
    static createFromEncryptedMessage(encrypted: IEncryptedMessage, receiver: Identity): IMessage;
    messageId?: string;
    receivedAt?: number;
    body: MessageBody;
    createdAt: number;
    receiverAddress: IPublicIdentity['address'];
    senderAddress: IPublicIdentity['address'];
    senderBoxPublicKey: IPublicIdentity['boxPublicKeyAsHex'];
    constructor(body: MessageBody, sender: Identity, receiver: IPublicIdentity);
    private message;
    private nonce;
    private hash;
    private signature;
    getEncryptedMessage(): IEncryptedMessage;
}
interface IMessageBodyBase {
    content: any;
    type: MessageBodyType;
}
export interface IRequestLegitimations extends IMessageBodyBase {
    content: IPartialClaim;
    type: MessageBodyType.REQUEST_LEGITIMATIONS;
}
export interface ISubmitLegitimations extends IMessageBodyBase {
    content: {
        claim: IPartialClaim;
        legitimations: IAttestedClaim[];
        delegationId?: DelegationNode['id'];
    };
    type: MessageBodyType.SUBMIT_LEGITIMATIONS;
}
export interface IRejectLegitimations extends IMessageBodyBase {
    content: {
        claim: IPartialClaim;
        legitimations: IAttestedClaim[];
        delegationId?: DelegationNode['id'];
    };
    type: MessageBodyType.REJECT_LEGITIMATIONS;
}
export interface IRequestAttestationForClaim extends IMessageBodyBase {
    content: IRequestForAttestation;
    type: MessageBodyType.REQUEST_ATTESTATION_FOR_CLAIM;
}
export interface ISubmitAttestationForClaim extends IMessageBodyBase {
    content: IAttestedClaim;
    type: MessageBodyType.SUBMIT_ATTESTATION_FOR_CLAIM;
}
export interface IRejectAttestationForClaim extends IMessageBodyBase {
    content: IRequestForAttestation;
    type: MessageBodyType.REJECT_ATTESTATION_FOR_CLAIM;
}
export interface IRequestClaimsForCTypes extends IMessageBodyBase {
    content: Array<ICType['hash']>;
    type: MessageBodyType.REQUEST_CLAIMS_FOR_CTYPES;
}
export interface ISubmitClaimsForCTypes extends IMessageBodyBase {
    content: IAttestedClaim[];
    type: MessageBodyType.SUBMIT_CLAIMS_FOR_CTYPES;
}
export interface IAcceptClaimsForCTypes extends IMessageBodyBase {
    content: IAttestedClaim[];
    type: MessageBodyType.ACCEPT_CLAIMS_FOR_CTYPES;
}
export interface IRejectClaimsForCTypes extends IMessageBodyBase {
    content: IAttestedClaim[];
    type: MessageBodyType.REJECT_CLAIMS_FOR_CTYPES;
}
export interface IRequestAcceptDelegation extends IMessageBodyBase {
    content: {
        delegationData: {
            account: IDelegationBaseNode['account'];
            id: IDelegationBaseNode['id'];
            parentId: IDelegationNode['id'];
            permissions: IDelegationNode['permissions'];
            isPCR: boolean;
        };
        metaData?: {
            [key: string]: any;
        };
        signatures: {
            inviter: string;
        };
    };
    type: MessageBodyType.REQUEST_ACCEPT_DELEGATION;
}
export interface ISubmitAcceptDelegation extends IMessageBodyBase {
    content: {
        delegationData: IRequestAcceptDelegation['content']['delegationData'];
        signatures: {
            inviter: string;
            invitee: string;
        };
    };
    type: MessageBodyType.SUBMIT_ACCEPT_DELEGATION;
}
export interface IRejectAcceptDelegation extends IMessageBodyBase {
    content: IRequestAcceptDelegation['content'];
    type: MessageBodyType.REJECT_ACCEPT_DELEGATION;
}
export interface IInformCreateDelegation extends IMessageBodyBase {
    content: {
        delegationId: IDelegationBaseNode['id'];
        isPCR: boolean;
    };
    type: MessageBodyType.INFORM_CREATE_DELEGATION;
}
export interface IPartialClaim extends Partial<IClaim> {
    cType: Claim['cType'];
}
export declare type MessageBody = IRequestLegitimations | ISubmitLegitimations | IRejectLegitimations | IRequestAttestationForClaim | ISubmitAttestationForClaim | IRejectAttestationForClaim | IRequestClaimsForCTypes | ISubmitClaimsForCTypes | IAcceptClaimsForCTypes | IRejectClaimsForCTypes | IRequestAcceptDelegation | ISubmitAcceptDelegation | IRejectAcceptDelegation | IInformCreateDelegation;
export {};
