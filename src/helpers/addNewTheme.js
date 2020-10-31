import {getStoreData, setStoreData} from "./storage";
import {THEME_STORAGE_KEY} from "../constants/theme";
import initialTheme from '../constants/theme';

export const changeTheme = async ({ newTheme = null, themeName } = {}) => {
  const storeData = await getStoreData(THEME_STORAGE_KEY);
  let theme = initialTheme;
  let storageThemeName;

  if(!!storeData) {
    theme = storeData.theme;
    storageThemeName = storeData.storageThemeName;
  }

  if(newTheme) {

    const currentTheme = theme[themeName] || {};
    theme[themeName] = {
      ...currentTheme,
      ...newTheme,
    };

    await setStoreData(THEME_STORAGE_KEY, { theme, storageThemeName: themeName });
    return theme[themeName];
  }

  await setStoreData(THEME_STORAGE_KEY, { theme, storageThemeName: themeName || storageThemeName});
  return {theme, themeName};
}