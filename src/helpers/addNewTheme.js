import {getStoreData, setStoreData} from "./storage";
import {THEME_STORAGE_KEY} from "../constants/theme";
import initialTheme from '../constants/theme';

export const changeTheme = async ({ newTheme = null, themeName } = {}) => {
  const storeData = await getStoreData(THEME_STORAGE_KEY);
  let theme = initialTheme;
  let storageThemeName = 'light';

  if(!!storeData && !!storeData.theme) {
    theme = storeData.theme;
    storageThemeName = storeData.storageThemeName;
  }

  storageThemeName = themeName || storageThemeName;

  if(newTheme) {

    const currentTheme = theme[storageThemeName] || {};
    theme[storageThemeName] = {
      ...currentTheme,
      ...newTheme,
    };

    await setStoreData(THEME_STORAGE_KEY, { theme, storageThemeName: storageThemeName });
    return {theme: theme[storageThemeName], storageThemeName};
  }

  await setStoreData(THEME_STORAGE_KEY, { theme, storageThemeName: storageThemeName});
  return {theme: theme[storageThemeName], themeName: storageThemeName};
}