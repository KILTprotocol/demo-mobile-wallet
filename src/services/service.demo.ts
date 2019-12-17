import { CONTACTS_SERVICE_URL } from '../_config'
import { BasePostParams } from '../services/service.messaging'
import { PublicIdentity } from '@kiltprotocol/sdk-js'

/* Not strictly needed for the demo wallet but it makes demo setup easier.
We're using the demo client app to attest and revoke, so the claimer needs to be known in the contact services (according to the logics in the demo client) */
async function saveIdentityAsContactInDemoServices(
  publicIdentity: PublicIdentity,
  username: string
): Promise<void> {
  fetch(`${CONTACTS_SERVICE_URL}`, {
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
