import React from 'react';
import {useSelector} from "react-redux";
import {Text} from "react-native-web";

const CustomFontText = ({text = '', propsStyles = {}, fontFamily = ''}) => {
	const isFontsReady = useSelector(state => state.stylesReducer.areFontsReady);
	const currentTheme = useSelector(state => state.stylesReducer.currentTheme);
	const finalFont = isFontsReady ? fontFamily : '';
	const finalStyles = [
		fontTextStyles.lowFont,
		currentTheme.defaultText,
		propsStyles,
		{fontFamily: finalFont}
	];

	return (
		<Text styles={finalStyles}>{text}</Text>
	);
}

const fontTextStyles = StyleSheet.create({
	lowFont: {
		fontSize: 12,
		fontWeight: 300,
	}
});

export default CustomFontText;