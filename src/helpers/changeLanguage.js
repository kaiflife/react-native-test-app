import {_getStoreData, _setStoreData} from "./storage";
import {LANGUAGE_STORAGE_KEY} from "../constants/languages";

export const changeLanguage = async (newLanguage = null) => {

  if(!!newLanguage) {
    await _setStoreData(LANGUAGE_STORAGE_KEY, newLanguage);

    return newLanguage;
  }

  const storeData = await _getStoreData(LANGUAGE_STORAGE_KEY);
  let language = 'eng';
  if(!!storeData) {
    language = storeData;
  }

  await _setStoreData(LANGUAGE_STORAGE_KEY, language);

  return language;
}