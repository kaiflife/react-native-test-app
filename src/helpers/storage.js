import AsyncStorage from '@react-native-async-storage/async-storage';

export const setStoreData = async (key, value) => {
  try {
    const typeValue = typeof value;
    let finalValue = value;
    if(typeValue === 'string') {
      finalValue = JSON.stringify(value)
    }
    await AsyncStorage.setItem(key, finalValue)
  } catch (e) {
    console.error('ERROR SET STORAGE', e, e.message);
  }
}

export const getStoreData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null ? JSON.parse(value) : null;
  } catch(e) {
    console.error('ERROR GET STORAGE', e, e.message);
  }
}