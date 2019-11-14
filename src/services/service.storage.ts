import AsyncStorage from '@react-native-community/async-storage'

// AsyncStorage is NOT shared across apps, but we still prefix our keys in case some of our libs are using AsyncStorage too
const ASYNC_STORAGE_PREFIX = '@KILT:'

const getAsyncStorageFullKeyName = (key: string): string =>
  `${ASYNC_STORAGE_PREFIX}${key}`

async function storeDataUnencrypted(
  key: string,
  value: string
): Promise<boolean> {
  try {
    await AsyncStorage.setItem(getAsyncStorageFullKeyName(key), value)
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

async function getDataUnencrypted(key: string): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(getAsyncStorageFullKeyName(key))
  } catch (error) {
    console.error(error)
    return null
  }
}

async function removeDataUnencrypted(key: string): Promise<boolean> {
  try {
    await AsyncStorage.removeItem(getAsyncStorageFullKeyName(key))
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

export { removeDataUnencrypted, storeDataUnencrypted, getDataUnencrypted }
