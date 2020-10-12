import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import React from "react";

const Button = ({ text, onPress, disable, styles = {} }) => {
  const Component = disable ? View : TouchableOpacity;
  return (
	<Component onPress={onPress} style={[defaultStyles.container, styles.container]}>
	  <Text style={[defaultStyles.text, styles.text]}>{text}</Text>
	</Component>
  );
}

const defaultStyles = StyleSheet.create({
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

export default Button;