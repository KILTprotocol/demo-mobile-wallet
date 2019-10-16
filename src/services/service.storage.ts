import AsyncStorage from '@react-native-community/async-storage'

// AsyncStorage is not shared across apps, but we still prefix our keys in case some libs use AsyncStorage too
const ASYNC_STORAGE_PREFIX = '@KILT:'

const getAsyncStorageFullKeyName = (key: string): string =>
  `${ASYNC_STORAGE_PREFIX}${key}`

async function storeDataUnencrypted(key: string, value: any): Promise<void> {
  try {
    await AsyncStorage.setItem(getAsyncStorageFullKeyName(key), value)
  } catch (error) {
    console.log(error)
  }
}

async function getDataUnencrypted(key: any): Promise<any> {
  try {
    const value = await AsyncStorage.getItem(getAsyncStorageFullKeyName(key))
    if (value !== null) {
      return value
    }
  } catch (error) {
    console.log(error)
  }
}

export { storeDataUnencrypted, getDataUnencrypted }
