import { TouchableOpacity, View, StyleSheet } from "react-native";
import React from "react";
import CustomFontText from "./CustomFontText";
import {useSelector} from "react-redux";
import {generalStyles} from "../constants/theme";

const CustomButton = ({ text, onPress, disable, propsStyles = {} }) => {
	const currentTheme = useSelector(state => state.themeReducer.currentTheme);
  const Component = !onPress || disable ? View : TouchableOpacity;
  const disabledStyles = disable ? buttonStyles.disabledButton : {};

  return (
	<Component
		onPress={onPress}
		style={[
			buttonStyles.container,
			currentTheme.defaultButton,
			propsStyles.container,
			disabledStyles,
		]}>
	  <CustomFontText text={text} propsStyles={[buttonStyles.text, currentTheme.defaultText, propsStyles.text]} />
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
		color: '#28b39c',
		fontSize: 16,
  },
	disabledButton: {
  	opacity: 0,
	}
});

export default CustomButton;