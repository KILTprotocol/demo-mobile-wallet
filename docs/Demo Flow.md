# Demo flow v2.0

You'll need to:
* have the demo-mobile-wallet (Sporran) installed on an iPhone (see [README](https://github.com/KILTprotocol/demo-mobile-wallet/blob/master/README.md) for device support details);
* access the [demo-client](https://demo.kilt.io/dashboard) from your laptop.

## Preparation steps

* 📱 in the mobile app: make sure you're connected to WLAN / data network
* 💻 in the demo-client: 
  * Create a new identity (any new identity!); it will be used as the **Attester** Identity
  * Request tokens for it
* 📱 in the mobile app: follow the onboarding steps.


## Demo steps

* 📱 in the mobile app = as the **Claimer**
  * Under `Account`: Request tokens
  * Under `Contacts`: Add a contact by scanning a KILT Public Identity QR Code displayed in the demo-client
  * Under `Dashboard`: 
   * Create a claim by filling its contents. 
   * Select an Attester, either by selecting a contact or by scanning a KILT Public Identity QR Code displayed in the demo-client. If you scan a QR Code, you can also add this attester to your contacts.
   * Once created, the claim should first have the status “Pending” (gray).
* 💻 in the demo-client = as the **Attester**
  * Check messages, the claim just requested by the attester should be there
  * Attest it
* 📱 in the mobile app = as the **Claimer** 
  * Check that your claim now has the status “Valid” (green)
* 💻 in the demo-client = as the **Attester**
  * Check Attestations, the claim that has just been attested should be listed
* Revoke it
  * 📱 in the mobile app = as the **Claimer**
  * Check that your claim now has the status “Revoked” (red)
  
## Screenshots

### Preparation steps

#### Claimer:

<p align="center">
 <img width="200" alt="intro" src="https://user-images.githubusercontent.com/9762897/74750832-a8ca5780-526c-11ea-9ddf-dbd892da1978.PNG">
 <img width="200" alt="" src="https://user-images.githubusercontent.com/9762897/74750553-2d68a600-526c-11ea-80d9-28ca4ee22a78.PNG">
 <img width="200" alt="" src="https://user-images.githubusercontent.com/9762897/74750563-3194c380-526c-11ea-92d5-706fff8226a9.PNG">
 <img width="200" alt="" src="https://user-images.githubusercontent.com/9762897/74750575-35284a80-526c-11ea-9069-ce66aa41e7f2.PNG">
 <img width="200" alt="" src="https://user-images.githubusercontent.com/9762897/74750580-36f20e00-526c-11ea-98ef-106374e66078.jpg">
 </p>

#### Attester:
<p align="center">
 <img width="600" alt="" src="https://user-images.githubusercontent.com/9762897/74750173-9c91ca80-526b-11ea-9f80-64deb1408a16.png">
</p>

### Demo

#### Claimer: Request tokens:
<p align="center">
 <img width="200" alt="tokens-before" src="https://user-images.githubusercontent.com/9762897/74751232-3d34ba00-526d-11ea-8d11-3a653ae5f314.PNG">
 <img width="200" alt="faucet-request-tokens" src="https://user-images.githubusercontent.com/9762897/74751246-41f96e00-526d-11ea-91fe-9ad377910b06.PNG">
 <img width="200" alt="faucet-request-tokens-success" src="https://user-images.githubusercontent.com/9762897/74751247-42920480-526d-11ea-8480-0d88839746d8.PNG">
 <img width="200" alt="tokens-success" src="https://user-images.githubusercontent.com/9762897/74751250-432a9b00-526d-11ea-8ef2-54a208968990.PNG">
</p>

#### Claimer: Create claim and request attestation:
<p align="center">
 <img width="200" alt="claim-create" src="https://user-images.githubusercontent.com/9762897/74751151-24c49f80-526d-11ea-8129-da4b3701bf3a.PNG">
 <img width="200" alt="claim-contents" src="https://user-images.githubusercontent.com/9762897/74751156-25f5cc80-526d-11ea-96f7-444df88be20c.PNG">
 <img width="200" alt="claim-contact" src="https://user-images.githubusercontent.com/9762897/74751160-2726f980-526d-11ea-86fb-4dc2f6cdd00d.PNG">
 <img width="200" alt="claim-qr-code" src="https://user-images.githubusercontent.com/9762897/74751169-29895380-526d-11ea-9c59-51dcfda00aeb.PNG">
 <img width="200" alt="claim-qr-code-name" src="https://user-images.githubusercontent.com/9762897/74751173-2b531700-526d-11ea-953a-676730ff237a.PNG">
 <img width="200" alt="claim-created" src="https://user-images.githubusercontent.com/9762897/74751175-2bebad80-526d-11ea-825f-80df5ae05aa7.PNG">
 </p>

#### Claimer: See claim status updates:
<p align="center">
 <img width="200" alt="claim-valid" src="https://user-images.githubusercontent.com/9762897/74751179-2c844400-526d-11ea-95e2-1512544bdd57.PNG">
 <img width="200" alt="claim-revoked" src="https://user-images.githubusercontent.com/9762897/74751180-2d1cda80-526d-11ea-9047-5a650927ddf3.PNG">
</p>

#### Attester: Attest:
<p align="center">
 <img width="600" alt="" src="https://user-images.githubusercontent.com/9762897/74750175-9dc2f780-526b-11ea-85bd-dc1f539d2ce2.png">
 <img width="600" alt="" src="https://user-images.githubusercontent.com/9762897/74750176-9dc2f780-526b-11ea-8da3-6aebdeeab95f.png">
</p>

#### Attester: Revoke:
<p align="center">
 <img width="600" alt="" src="https://user-images.githubusercontent.com/9762897/74750180-9e5b8e00-526b-11ea-915a-d144e47fbd79.png">
</p>

