import React, { useEffect } from "react";
import {View, StyleSheet} from "react-native";
import CustomFontText from "../components/CustomFontText";

const SettingsScreen = () => {

	return (
		<View style={styles.container}>
			<CustomFontText text='My settings' />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	}
});

export default SettingsScreen;