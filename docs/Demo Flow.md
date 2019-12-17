# Demo flow

## Preparation steps
* 📱in the mobile app: make sure you're connected to WLAN / data network
* 💻on demo.kilt.io: create a new identity with the mnemonic specified in `_config.ts`. This is the Attester. 
* 📱in the mobile app: follow the onboarding steps.

## Demo steps 
* 📱in the mobile app = as the Claimer
  * Account: Request tokens
  * Contacts: Add a contact, e.g. by scanning this:
  * Dashboard: Create a claim. It should first have the status “Pending” (gray).
* 💻on demo.kilt.io = as the Attester
  * Check messages, the claim just requested by the attester should be there
  * Attest it
* 📱in the mobile app = as the Claimer 
  * Check that your claim now has the status “Valid” (green)
* 💻on demo.kilt.io = as the Attester]
  * Check Attestations, the claim just attested should be there
* Revoke it
  * 📱in the mobile app = as the Claimer
  * Check that your claim now has the status “Revoked” (red)
