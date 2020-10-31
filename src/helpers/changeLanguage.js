import {getStoreData, setStoreData} from "./storage";
import {LANGUAGE_STORAGE_KEY} from "../constants/languages";

export const changeLanguage = async (newLanguage = null) => {
  const storeData = await getStoreData(LANGUAGE_STORAGE_KEY);
  let language;
  if(!!storeData) {
    language = storeData;
  }

  if(!!newLanguage) {
    await setStoreData(LANGUAGE_STORAGE_KEY, newLanguage);

    return newLanguage;
  }

  await setStoreData(LANGUAGE_STORAGE_KEY, language);

  return language;
}