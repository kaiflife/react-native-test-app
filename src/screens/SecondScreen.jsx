import {Text, View, StyleSheet} from "react-native";
import React from "react";

const SecondScreen = () => {
	return (
		<View style={styles.container}>
			<Text>SecondScreen</Text>
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

export default SecondScreen;