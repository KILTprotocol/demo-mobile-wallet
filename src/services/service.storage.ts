import AsyncStorage from '@react-native-community/async-storage'

// AsyncStorage is not shared across apps, but we still prefix our keys in case some libs use AsyncStorage too
const ASYNC_STORAGE_PREFIX = '@KILT:'

const getAsyncStorageFullKeyName = (key: string): string =>
  `${ASYNC_STORAGE_PREFIX}${key}`

async function storeDataUnencrypted(key: string, value: any): Promise<boolean> {
  let stored = false
  try {
    await AsyncStorage.setItem(getAsyncStorageFullKeyName(key), value)
    stored = true
  } catch (error) {
    console.log(error)
  } finally {
    return stored
  }
}

async function getDataUnencrypted(key: any): Promise<any> {
  let value = null
  try {
    value = await AsyncStorage.getItem(getAsyncStorageFullKeyName(key))
  } catch (error) {
    console.log(error)
  } finally {
    return value
  }
}

export { storeDataUnencrypted, getDataUnencrypted }
