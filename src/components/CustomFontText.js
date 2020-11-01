import React from 'react';
import {useSelector} from "react-redux";
import {Text, StyleSheet} from "react-native";

const CustomFontText = ({text = '', propsStyles = {}, fontFamily = ''}) => {
	const currentTheme = useSelector(state => state.themeReducer.currentTheme);
	const allStyles = {
		...fontTextStyles.lowFont,
		...currentTheme.defaultText,
		...propsStyles,
		fontFamily: fontFamily
	};

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