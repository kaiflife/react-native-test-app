import React from 'react';
import {TextInput, StyleSheet} from "react-native";
import {useSelector} from "react-redux";

const CustomInput = ({ propsStyles = {}, placeholder = '', secureTextEntry, text = '', onChange = () => {}, disable = false}) => {
  const currentTheme = useSelector(state => state.theme.currentTheme);
  const languageWords = useSelector(state => state.language.languageWords);
  const disablePropsStyles = propsStyles.container && propsStyles.container.disable;
  const disableStyles = disable && (disablePropsStyles || styles.disableContainer);
  const pressFunc = disable ? () => {} : onChange;
  return (
    <TextInput
      autoCompleteType={secureTextEntry ? 'password' : disable ? 'off' : 'username'}
      secureTextEntry={secureTextEntry}
      value={text}
      placeholder={languageWords[placeholder]}
      placeholderTextColor={currentTheme.defaultInputPlaceholder}
      onChangeText={pressFunc}
      style={{...styles.input, ...currentTheme.defaultInput, ...propsStyles.input, ...disableStyles}}
    />
  );
}

const styles = StyleSheet.create({
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