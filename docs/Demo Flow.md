# Demo flow

## Preparation steps

* 📱in the mobile app: make sure you're connected to WLAN / data network
* 💻on [demo.kilt.io](https://demo.kilt.io/dashboard): 
  * create a new identity
  * request tokens for it
  * paste its mnemonic into `_config.ts` as `ATTESTER_MNEMONIC`; this is the Attester.
* 📱in the mobile app: follow the onboarding steps.

## Demo steps

* 📱in the mobile app = as the Claimer
  * Account: Request tokens
  * Contacts: Add a contact, e.g. by scanning a KILT address QR Code
  * Dashboard: Create a claim. It should first have the status “Pending” (gray).
* 💻on demo.kilt.io = as the Attester
  * Check messages, the claim just requested by the attester should be there
  * Attest it
* 📱in the mobile app = as the Claimer 
  * Check that your claim now has the status “Valid” (green)
* 💻on demo.kilt.io = as the Attester
  * Check Attestations, the claim just attested should be there
* Revoke it
  * 📱in the mobile app = as the Claimer
  * Check that your claim now has the status “Revoked” (red)
