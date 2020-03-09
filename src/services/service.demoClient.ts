import { PublicIdentity } from '@kiltprotocol/sdk-js'
import { BasePostParams } from './service.messaging'
import { CONFIG_CONNECT } from '../config'

/* the demo-wallet demo flow relies on the demo-client to attest and revoke. Unfortunately the demo-client crashes when trying to attest a claim from an 'unknown' claimer; so we need here to save the claimer in the demo-client's contact services */
async function saveIdentityAsContactInDemoServices(
  publicIdentity: PublicIdentity,
  username: string
): Promise<void> {
  fetch(`${CONFIG_CONNECT.CONTACTS_SERVICE_URL}`, {
    ...BasePostParams,
    body: JSON.stringify({
      publicIdentity,
      metaData: { name: username },
    }),
  }).then(response => {
    console.info(
      '[IDENTITY] Public identity saved as contact in the demo contact services for demo purposes'
    )
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return response
  })
}

export default saveIdentityAsContactInDemoServices
