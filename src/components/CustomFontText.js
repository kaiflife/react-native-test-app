import React from 'react';
import {useSelector} from "react-redux";
import {Text, StyleSheet} from "react-native";

const CustomFontText = ({text = '', propsStyles = {}, fontFamily = ''}) => {
	const currentTheme = useSelector(state => state.theme.currentTheme);
	const finalStyles = [
		fontTextStyles.lowFont,
		currentTheme.defaultText,
		propsStyles,
		{fontFamily: fontFamily}
	];

	return (
		<Text styles={finalStyles}>{text}</Text>
	);
}

const fontTextStyles = StyleSheet.create({
	lowFont: {
		fontSize: 12,
		fontWeight: '300',
	}
});

export default CustomFontText;