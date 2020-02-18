# Demo flow

You'll need to:
* have the demo-mobile-wallet (Sporran) installed on an iPhone (see [README](https://github.com/KILTprotocol/demo-mobile-wallet/blob/master/README.md) for device support details);
* access the [demo-client](https://demo.kilt.io/dashboard) from your laptop.

## Preparation steps

* 📱 in the mobile app: make sure you're connected to WLAN / data network
* 💻 in the demo-client: 
  * Create a new identity, which will be used as the Attester Idenitity
  * Request tokens for it
* 📱 in the mobile app: follow the onboarding steps.

<img width="200" alt="" src="https://user-images.githubusercontent.com/9762897/74750553-2d68a600-526c-11ea-80d9-28ca4ee22a78.PNG">
<img width="200" alt="" src="https://user-images.githubusercontent.com/9762897/74750563-3194c380-526c-11ea-92d5-706fff8226a9.PNG">
<img width="200" alt="" src="https://user-images.githubusercontent.com/9762897/74750573-33f71d80-526c-11ea-87ce-53774ba6861c.PNG">
<img width="200" alt="" src="https://user-images.githubusercontent.com/9762897/74750575-35284a80-526c-11ea-9069-ce66aa41e7f2.PNG">
<img width="200" alt="" src="https://user-images.githubusercontent.com/9762897/74750580-36f20e00-526c-11ea-98ef-106374e66078.jpg">


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
  
## Demo steps: screenshots
  
<img width="400" alt="" src="https://user-images.githubusercontent.com/9762897/74750173-9c91ca80-526b-11ea-9f80-64deb1408a16.png">
<img width="400" alt="" src="https://user-images.githubusercontent.com/9762897/74750175-9dc2f780-526b-11ea-85bd-dc1f539d2ce2.png">
<img width="400" alt="" src="https://user-images.githubusercontent.com/9762897/74750176-9dc2f780-526b-11ea-8da3-6aebdeeab95f.png">
<img width="400" alt="" src="https://user-images.githubusercontent.com/9762897/74750180-9e5b8e00-526b-11ea-915a-d144e47fbd79.png">
