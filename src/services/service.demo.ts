import { PublicIdentity } from '@kiltprotocol/sdk-js'
import { BasePostParams } from './service.messaging'
import { CONFIG_CONNECT } from '../config'

/* Not strictly needed for the demo wallet but it makes demo setup easier.
We're using the demo client app to attest and revoke, so the claimer needs to be known in the contact services (according to the logics in the demo client) */
async function saveIdentityAsContactInDemoServices(
  publicIdentity: PublicIdentity,
  username: string
): Promise<void> {
  fetch(`${CONFIG_CONNECT.CONTACTS_SERVICE_URL}`, {
    ...BasePostParams,
    body: JSON.stringify({
      metaData: { name: username },
      publicIdentity,
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

export { saveIdentityAsContactInDemoServices }
