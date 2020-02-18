# Demo flow

## Preparation steps

* 📱 In the mobile app: make sure you're connected to WLAN / data network
* 💻 on the [deployed demo-client](https://demo.kilt.io/dashboard): 
  * Create a new identity, which will be used as the Attester Idenitity
  * Request tokens for it
* 📱 In the mobile app: follow the onboarding steps.

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
