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
    modalContainer: {},
  },
  light: {
    defaultButton: {
      borderColor: 'black',
      borderWidth: 2,
      backgroundColor: 'orange',
    },
    appError: {
      width: '100%',
      marginBottom: 5,
      color: 'red',
      fontSize: 16,
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
    modalContainer: {},
  }
}

export const THEME_STORAGE_KEY = 'themeKey';

export default theme;