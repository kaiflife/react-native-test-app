import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import React from "react";
import CustomFontText from "./CustomFontText";
import {useSelector} from "react-redux";

const CustomButton = ({ text, onPress, disable, propsStyles = {} }) => {
	const currentTheme = useSelector(state => state.theme.currentTheme);
  const Component = !onPress || disable ? View : TouchableOpacity;

  return (
	<Component onPress={onPress} style={{...buttonStyles.container, ...currentTheme.defaultButton, ...propsStyles.container}}>
	  <CustomFontText text={text} propsStyles={{...buttonStyles.text, ...currentTheme.defaultText, ...propsStyles.text}} />
	</Component>
  );
}

const buttonStyles = StyleSheet.create({
  container: {
		height: 40,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 4,
  },
  text: {
		color: 'white',
		fontSize: 13,
  }
});

export default CustomButton;