import React from 'react';
import {View, TextInput, StyleSheet} from "react-native";
import {useSelector} from "react-redux";

const CustomInput = ({ propsStyles = {}, text = '', onPress, disable = false}) => {
  const currentTheme = useSelector(state => state.theme.currentTheme);
  const disablePropsStyles = propsStyles.container && propsStyles.container.disable;
  const disableStyles = disable && (disablePropsStyles || styles.disableContainer);
  const UsingComponent = disable || !onPress ? View : TextInput;
  return (
    <View style={[currentTheme.defaultInputContainer, propsStyles.container, disableStyles]}>
        <UsingComponent text={text} onPress={onPress} style={[currentTheme.defaultInput, propsStyles.input]} />
    </View>
  );
}

const styles = StyleSheet.create({
  disableContainer: {
    opacity: 0.3,
  }
})

export default CustomInput;