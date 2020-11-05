import React from 'react';
import {useSelector} from "react-redux";
import {Text, StyleSheet} from "react-native";
import {generalStyles} from "../constants/theme";

const CustomFontText = ({text = '', propsStyles = {}, fontFamily = ''}) => {
	const currentTheme = useSelector(state => state.themeReducer.currentTheme);
	const allStyles = [
		fontTextStyles.lowFont,
		currentTheme.defaultText,
		generalStyles.defaultText,
		propsStyles,
		{fontFamily},
	];

	return (
		<Text style={allStyles}>{text}</Text>
	);
}

const fontTextStyles = StyleSheet.create({
	lowFont: {
		fontWeight: '400',
		position: 'relative',
		zIndex: 2,
	}
});

export default CustomFontText;