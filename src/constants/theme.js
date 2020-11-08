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
    boardsContainer: {
      backgroundColor: 'white',
    },
    boardItem : {
      backgroundColor: '#a8a850',
      borderColor: 'orange',
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
    noBoards: {
      color: 'white',
      textAlign: 'center',
    },
  },
  light: {
    noBoards: {
      color: 'black',
      textAlign: 'center',
    },
    defaultButton: {
      borderColor: 'black',
      borderWidth: 2,
      backgroundColor: '#ffa200',
    },
    appError: {
      width: '100%',
      color: 'red',
      fontSize: 16,
    },
    defaultText: {
      color: 'white',
    },
    boardsContainer: {
      backgroundColor: 'dark',
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
    boardItem : {
      backgroundColor: '#b2e37f',
      borderColor: '#6d4444',
    },
    columnItem: {
      backgroundColor: '#9d4242',
      borderColor: '#b2e37f',
    }
  }
}

const THEME_STORAGE_KEY = 'themeKey';

const generalStyles = {
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  hideFullScreenComponent: {
    height: 0,
    opacity: 0,
    padding: 0,
    margin: 0,
  },
  modalFooterButtonStyles: {
    container: {
      width: '47%',
    },
  },
  boardItem: {
    flexBasis: '49%',
    marginBottom: '2%',
    borderWidth: 1,
    borderRadius: 4,
  },
  boardClickContainer: {
    flex: 1,
    width: '100%',
    padding: 20,
  },
  boardTitle: {
    alignSelf: 'center',
    fontSize: 20,
  },
  defaultText: {
    fontSize: 16,
  },
};

export {
  generalStyles,
  THEME_STORAGE_KEY,
}

export default theme;