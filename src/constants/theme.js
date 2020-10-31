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
    defaultInputPlaceholder: 'white',
    defaultInput: {
      color: 'white',
      backgroundColor: 'black',
      borderColor: 'orange',
      borderWidth: 2,
      padding: 10,
    },
  },
  light: {
    defaultButton: {
      borderColor: 'black',
      borderWidth: 2,
      backgroundColor: 'orange',
    },
    appError: {
      textAlign: 'center',
      width: '100%',
      position: 'relative',
      color: 'red',
      fontSize: 20,
    },
    defaultText: {
      color: 'white',
    },
    defaultInput: {
      color: 'black',
      backgroundColor: 'lightblue',
      borderColor: 'black',
      borderWidth: 2,
      padding: 10,
    },
    defaultInputPlaceholder: 'gray',
  }
}

export const THEME_STORAGE_KEY = 'themeKey';

export default theme;