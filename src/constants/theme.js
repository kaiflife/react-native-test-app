const theme = {
  dark: {
    defaultButton: {
      borderColor: 'white',
      borderWidth: 2,
      backgroundColor: 'orange',
    },
    defaultText: {
      color: 'black',
    },
    defaultInput: {
      color: 'white',
    },
    defaultInputContainer: {
      backgroundColor: 'black',
      borderColor: 'orange',
      borderWidth: 2,
      padding: 10,
    },
  },
  light: {
    defaultButton: {
      borderColor: 'orange',
      borderWidth: 2,
      backgroundColor: 'black',
    },
    defaultText: {
      color: 'white',
    },
    defaultInput: {
      color: 'white',
    },
    defaultInputContainer: {
      backgroundColor: 'black',
      borderColor: 'orange',
      borderWidth: 2,
      padding: 10,
    },
  }
}

export const THEME_STORAGE_KEY = 'themeKey';

export default theme;