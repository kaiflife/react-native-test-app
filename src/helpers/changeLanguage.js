import {_getStoreData, _setStoreData} from "./storage";
import {LANGUAGE_STORAGE_KEY} from "../constants/languages";

export const changeLanguage = async (newLanguage = null) => {
  const storeData = await _getStoreData(LANGUAGE_STORAGE_KEY);
  let language;
  if(!!storeData) {
    language = storeData;
  }

  if(!!newLanguage) {
    await _setStoreData(LANGUAGE_STORAGE_KEY, newLanguage);

    return newLanguage;
  }

  await _setStoreData(LANGUAGE_STORAGE_KEY, language);

  return language;
}