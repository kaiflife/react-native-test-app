const theme = {
  dark: {
    defaultButton: {
      borderColor: 'white',
      backgroundColor: 'orange',
    },
    defaultText: {
      color: 'black',
    }
  },
  light: {
    defaultButton: {
      borderColor: 'orange',
      backgroundColor: 'black',
    },
    defaultText: {
      color: 'white',
    }
  }
}

export const THEME_STORAGE_KEY = 'themeKey';

export default theme;