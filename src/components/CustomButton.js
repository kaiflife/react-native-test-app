import { TouchableOpacity, View, StyleSheet } from "react-native";
import React from "react";
import CustomFontText from "./CustomFontText";
import {useSelector} from "react-redux";

const CustomButton = ({ text, onPress, disable, propsStyles = {} }) => {
	const currentTheme = useSelector(state => state.theme.currentTheme);
  const Component = !onPress || disable ? View : TouchableOpacity;
  return (
	<Component onPress={onPress} style={[buttonStyles.container, currentTheme.defaultButton, propsStyles.container]}>
	  <CustomFontText text={text} propsStyles={[buttonStyles.text, propsStyles.text]} />
	</Component>
  );
}

const buttonStyles = StyleSheet.create({
  container: {
		flex: 1,
		backgroundColor: '#44b5c0',
		alignItems: 'center',
		justifyContent: 'center',
  },
  text: {
		color: 'white',
		fontSize: 13,
  }
});

export default CustomButton;