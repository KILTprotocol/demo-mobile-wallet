import {
  getGenericPassword,
  setGenericPassword,
  ACCESS_CONTROL,
  ACCESSIBLE,
  AUTHENTICATION_TYPE,
} from 'react-native-keychain'
import { Identity } from '@kiltprotocol/sdk-js'

async function setIdentityEncrypted(identity: Identity): Promise<boolean> {
  // Keychain's API namings are a bit confusing, this is not a passowrd but just an encrypted value
  return setGenericPassword('identity', JSON.stringify(identity), {
    accessControl: ACCESS_CONTROL.USER_PRESENCE,
    accessible: ACCESSIBLE.WHEN_PASSCODE_SET_THIS_DEVICE_ONLY,
    authenticationPrompt: 'Identity',
    authenticationType: AUTHENTICATION_TYPE.DEVICE_PASSCODE_OR_BIOMETRICS,
  })
}

async function promptUserAndGetIdentityDecrypted(): Promise<any> {
  // prmopts the user for a secret depending on setIdentityEncrypted's parameters
  const identityWrapper = await getGenericPassword()
  return identityWrapper ? JSON.parse(identityWrapper.password) : null
}

export { promptUserAndGetIdentityDecrypted, setIdentityEncrypted }
