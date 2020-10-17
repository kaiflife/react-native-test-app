import React from 'react';
import {useSelector} from "react-redux";
import {Text} from "react-native-web";

const CustomFontText = ({text = '', styles = {}, fontFamily = ''}) => {
	const isFontsReady = useSelector(state => state.stylesReducer.areFontsReady);
	const finalFont = isFontsReady ? fontFamily : '';
	const finalStyles = [
		fontTextStyles.lowFont,
		styles,
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