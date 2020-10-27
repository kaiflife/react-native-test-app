import {getStoreData, setStoreData} from "./storage";
import {THEME_STORAGE_KEY} from "../constants/theme";
import initialTheme from '../constants/theme';

export const changeTheme = async ({ newTheme = null, currentThemeName }) => {
  let { theme, storageThemeName } = await getStoreData(THEME_STORAGE_KEY);

  if(!newTheme) {
    let actualTheme = theme;

    if(!actualTheme) {
      actualTheme = initialTheme;
      await setStoreData(THEME_STORAGE_KEY, { theme: actualTheme, storageThemeName: currentThemeName});
    }

    return actualTheme[currentThemeName];
  }

  theme[currentThemeName] = {
    ...theme[storageThemeName],
    ...newTheme,
  };

  await setStoreData(THEME_STORAGE_KEY, { theme, storageThemeName: currentThemeName});

  return theme[currentThemeName];
}