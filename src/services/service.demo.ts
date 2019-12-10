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
      // todo check if crash demo client when username empty; if so should protect against that
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
