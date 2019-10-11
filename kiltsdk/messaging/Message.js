"use strict";
/**
 * KILT participants can communicate via a 1:1 messaging system.
 * ***
 * All messages are **encrypted** with the encryption keys of the involved identities. Every time an actor sends data about an [[Identity]], they have to sign the message to prove access to the corresponding private key.
 * <br>
 * The [[Message]] class exposes methods to construct and verify messages.
 * @module Messaging
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const crypto_1 = tslib_1.__importDefault(require("../crypto"));
var MessageBodyType;
(function (MessageBodyType) {
    MessageBodyType["REQUEST_LEGITIMATIONS"] = "request-legitimations";
    MessageBodyType["SUBMIT_LEGITIMATIONS"] = "submit-legitimations";
    MessageBodyType["REJECT_LEGITIMATIONS"] = "reject-legitimations";
    MessageBodyType["REQUEST_ATTESTATION_FOR_CLAIM"] = "request-attestation-for-claim";
    MessageBodyType["SUBMIT_ATTESTATION_FOR_CLAIM"] = "submit-attestation-for-claim";
    MessageBodyType["REJECT_ATTESTATION_FOR_CLAIM"] = "reject-attestation-for-claim";
    MessageBodyType["REQUEST_CLAIMS_FOR_CTYPES"] = "request-claims-for-ctypes";
    MessageBodyType["SUBMIT_CLAIMS_FOR_CTYPES"] = "submit-claims-for-ctypes";
    MessageBodyType["ACCEPT_CLAIMS_FOR_CTYPES"] = "accept-claims-for-ctypes";
    MessageBodyType["REJECT_CLAIMS_FOR_CTYPES"] = "reject-claims-for-ctypes";
    MessageBodyType["REQUEST_ACCEPT_DELEGATION"] = "request-accept-delegation";
    MessageBodyType["SUBMIT_ACCEPT_DELEGATION"] = "submit-accept-delegation";
    MessageBodyType["REJECT_ACCEPT_DELEGATION"] = "reject-accept-delegation";
    MessageBodyType["INFORM_CREATE_DELEGATION"] = "inform-create-delegation";
})(MessageBodyType = exports.MessageBodyType || (exports.MessageBodyType = {}));
class Message {
    static ensureOwnerIsSender(message) {
        switch (message.body.type) {
            case MessageBodyType.REQUEST_ATTESTATION_FOR_CLAIM:
                {
                    const requestAttestation = message.body;
                    if (requestAttestation.content.claim.owner !== message.senderAddress) {
                        throw new Error('Sender is not owner of the claim');
                    }
                }
                break;
            case MessageBodyType.SUBMIT_ATTESTATION_FOR_CLAIM:
                {
                    const submitAttestation = message.body;
                    if (submitAttestation.content.attestation.owner !==
                        message.senderAddress) {
                        throw new Error('Sender is not owner of the attestation');
                    }
                }
                break;
            case MessageBodyType.SUBMIT_CLAIMS_FOR_CTYPES:
                {
                    const submitClaimsForCtype = message.body;
                    submitClaimsForCtype.content.forEach(claim => {
                        if (claim.request.claim.owner !== message.senderAddress) {
                            throw new Error('Sender is not owner of the claims');
                        }
                    });
                }
                break;
            default:
        }
    }
    static ensureHashAndSignature(encrypted, senderAddress) {
        const hashInput = encrypted.message + encrypted.nonce + encrypted.createdAt;
        const hash = crypto_1.default.hashStr(hashInput);
        if (hash !== encrypted.hash) {
            throw new Error('Hash of message not correct');
        }
        if (!crypto_1.default.verify(hash, encrypted.signature, senderAddress)) {
            throw new Error('Signature of message not correct');
        }
    }
    static createFromEncryptedMessage(encrypted, receiver) {
        Message.ensureHashAndSignature(encrypted, encrypted.senderAddress);
        const ea = {
            box: encrypted.message,
            nonce: encrypted.nonce,
        };
        const decoded = receiver.decryptAsymmetricAsStr(ea, encrypted.senderBoxPublicKey);
        if (!decoded) {
            throw new Error('Error decoding message');
        }
        try {
            const messageBody = JSON.parse(decoded);
            return {
                messageId: encrypted.messageId,
                receivedAt: encrypted.receivedAt,
                body: messageBody,
                createdAt: encrypted.createdAt,
                receiverAddress: encrypted.receiverAddress,
                senderAddress: encrypted.senderAddress,
                senderBoxPublicKey: encrypted.senderBoxPublicKey,
            };
        }
        catch (error) {
            throw new Error('Error parsing message body');
        }
    }
    constructor(body, sender, receiver) {
        this.body = body;
        this.createdAt = Date.now();
        this.receiverAddress = receiver.address;
        this.senderAddress = sender.address;
        this.senderBoxPublicKey = sender.boxPublicKeyAsHex;
        const encryptedMessage = sender.encryptAsymmetricAsStr(JSON.stringify(body), receiver.boxPublicKeyAsHex);
        this.message = encryptedMessage.box;
        this.nonce = encryptedMessage.nonce;
        const hashInput = this.message + this.nonce + this.createdAt;
        this.hash = crypto_1.default.hashStr(hashInput);
        this.signature = sender.signStr(this.hash);
    }
    getEncryptedMessage() {
        return {
            messageId: this.messageId,
            receivedAt: this.receivedAt,
            message: this.message,
            nonce: this.nonce,
            createdAt: this.createdAt,
            hash: this.hash,
            signature: this.signature,
            receiverAddress: this.receiverAddress,
            senderAddress: this.senderAddress,
            senderBoxPublicKey: this.senderBoxPublicKey,
        };
    }
}
exports.default = Message;
//# sourceMappingURL=Message.js.map