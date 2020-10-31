import React from 'react';
import {TextInput, StyleSheet, View} from "react-native";
import {useSelector} from "react-redux";
import CustomFontText from "./CustomFontText";

const CustomInput = ({
  propsStyles = {},
  isError = false,
  placeholder = '',
  secureTextEntry,
  text = '',
  onChange = () => {},
  disable = false
}) => {
  const currentTheme = useSelector(state => state.themeReducer.currentTheme);
  const error = useSelector(state => state.authReducer.error);
  const languageWords = useSelector(state => state.languageReducer.languageWords);
  const disablePropsStyles = propsStyles.container && propsStyles.container.disable;
  const disableStyles = disable && (disablePropsStyles || styles.disableContainer);
  const pressFunc = disable ? () => {} : onChange;
  return (
    <View style={styles.container}>
      {isError && <CustomFontText text={languageWords[error]} propsStyles={currentTheme.appError} />}
      <TextInput
        autoCompleteType={secureTextEntry ? 'password' : disable ? 'off' : 'username'}
        secureTextEntry={secureTextEntry}
        value={text}
        placeholder={languageWords[placeholder]}
        placeholderTextColor={currentTheme.defaultInputPlaceholder}
        onChangeText={pressFunc}
        style={{...styles.input, ...currentTheme.defaultInput, ...propsStyles.input, ...disableStyles}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    height: 40,
    marginBottom: 20,
    width: '100%',
    backgroundColor: 'red',
    borderRadius: 4,
  },
  disableContainer: {
    opacity: 0.3,
  }
})

export default CustomInput;