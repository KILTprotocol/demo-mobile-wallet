"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Identity_1 = tslib_1.__importDefault(require("../identity/Identity"));
const Message_1 = tslib_1.__importStar(require("./Message"));
const crypto_1 = tslib_1.__importDefault(require("../crypto"));
describe('Messaging', () => {
    const identityAlice = Identity_1.default.buildFromURI('//Alice');
    const identityBob = Identity_1.default.buildFromURI('//Bob');
    it('verify message encryption and signing', () => {
        const messageBody = {
            content: ['0x12345678'],
            type: Message_1.MessageBodyType.REQUEST_CLAIMS_FOR_CTYPES,
        };
        const message = new Message_1.default(messageBody, identityAlice, identityBob.getPublicIdentity());
        const encryptedMessage = message.getEncryptedMessage();
        const decryptedMessage = Message_1.default.createFromEncryptedMessage(encryptedMessage, identityBob);
        expect(JSON.stringify(messageBody)).toEqual(JSON.stringify(decryptedMessage.body));
        const encryptedMessageWrongHash = JSON.parse(JSON.stringify(encryptedMessage));
        encryptedMessageWrongHash.hash = '0x00000000';
        expect(() => Message_1.default.createFromEncryptedMessage(encryptedMessageWrongHash, identityBob)).toThrowError(new Error('Hash of message not correct'));
        const encryptedMessageWrongSignature = JSON.parse(JSON.stringify(encryptedMessage));
        encryptedMessageWrongSignature.signature = encryptedMessageWrongSignature.signature.substr(0, encryptedMessageWrongSignature.signature.length - 4);
        encryptedMessageWrongSignature.signature += '1234';
        expect(() => Message_1.default.createFromEncryptedMessage(encryptedMessageWrongSignature, identityBob)).toThrowError(new Error('Signature of message not correct'));
        const encryptedMessageWrongContent = JSON.parse(JSON.stringify(encryptedMessage));
        encryptedMessageWrongContent.message = '1234';
        const hashStrWrongContent = crypto_1.default.hashStr(encryptedMessageWrongContent.message +
            encryptedMessageWrongContent.nonce +
            encryptedMessageWrongContent.createdAt);
        encryptedMessageWrongContent.hash = hashStrWrongContent;
        encryptedMessageWrongContent.signature = identityAlice.signStr(hashStrWrongContent);
        expect(() => Message_1.default.createFromEncryptedMessage(encryptedMessageWrongContent, identityBob)).toThrowError(new Error('Error decoding message'));
        const encryptedWrongBody = identityAlice.encryptAsymmetricAsStr('{ wrong JSON', identityBob.boxPublicKeyAsHex);
        const ts = Date.now();
        const hashStrBadContent = crypto_1.default.hashStr(encryptedWrongBody.box + encryptedWrongBody.nonce + ts);
        const encryptedMessageWrongBody = {
            createdAt: ts,
            receiverAddress: encryptedMessage.receiverAddress,
            senderAddress: encryptedMessage.senderAddress,
            message: encryptedWrongBody.box,
            nonce: encryptedWrongBody.nonce,
            hash: hashStrBadContent,
            signature: identityAlice.signStr(hashStrBadContent),
            senderBoxPublicKey: encryptedMessage.senderBoxPublicKey,
        };
        expect(() => Message_1.default.createFromEncryptedMessage(encryptedMessageWrongBody, identityBob)).toThrowError(new Error('Error parsing message body'));
    });
    it('verify message sender is owner', () => {
        const requestAttestationBody = {
            content: {
                ctypeHash: { nonce: '0x12345678', hash: '0x12345678' },
                claim: {
                    cType: '0x12345678',
                    owner: identityAlice.getPublicIdentity().address,
                    contents: {},
                },
                claimHashTree: {},
                legitimations: [],
                hash: '0x12345678',
                claimerSignature: '0x12345678',
            },
            type: Message_1.MessageBodyType.REQUEST_ATTESTATION_FOR_CLAIM,
        };
        Message_1.default.ensureOwnerIsSender(new Message_1.default(requestAttestationBody, identityAlice, identityBob.getPublicIdentity()));
        expect(() => Message_1.default.ensureOwnerIsSender(new Message_1.default(requestAttestationBody, identityBob, identityAlice.getPublicIdentity()))).toThrowError(new Error('Sender is not owner of the claim'));
        const submitAttestationBody = {
            content: {
                request: requestAttestationBody.content,
                attestation: {
                    claimHash: requestAttestationBody.content.hash,
                    cTypeHash: '0x12345678',
                    owner: identityBob.getPublicIdentity().address,
                    revoked: false,
                },
            },
            type: Message_1.MessageBodyType.SUBMIT_ATTESTATION_FOR_CLAIM,
        };
        expect(() => Message_1.default.ensureOwnerIsSender(new Message_1.default(submitAttestationBody, identityAlice, identityBob.getPublicIdentity()))).toThrowError(new Error('Sender is not owner of the attestation'));
        Message_1.default.ensureOwnerIsSender(new Message_1.default(submitAttestationBody, identityBob, identityAlice.getPublicIdentity()));
        const submitClaimsForCTypeBody = {
            content: [submitAttestationBody.content],
            type: Message_1.MessageBodyType.SUBMIT_CLAIMS_FOR_CTYPES,
        };
        Message_1.default.ensureOwnerIsSender(new Message_1.default(submitClaimsForCTypeBody, identityAlice, identityBob.getPublicIdentity()));
        expect(() => Message_1.default.ensureOwnerIsSender(new Message_1.default(submitClaimsForCTypeBody, identityBob, identityAlice.getPublicIdentity()))).toThrowError(new Error('Sender is not owner of the claims'));
    });
});
//# sourceMappingURL=Message.spec.js.map