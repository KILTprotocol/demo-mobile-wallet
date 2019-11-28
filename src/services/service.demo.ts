import { CONTACTS_SERVICE_URL } from '../_config'
import { BasePostParams } from '../services/service.messaging'
import { PublicIdentity } from '@kiltprotocol/sdk-js'

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
      '[IDENTITY] Public identity saved as contact in the demo contact services, for convenience'
    )
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return response
  })
}

export { saveIdentityAsContactInDemoServices }
