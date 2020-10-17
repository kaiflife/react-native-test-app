import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import React from "react";

const Button = ({ text, onPress, disable, styles = {} }) => {
  const Component = disable ? View : TouchableOpacity;
  return (
	<Component onPress={onPress} style={[buttonStyles.container, styles.container]}>
	  <Text style={[buttonStyles.text, styles.text]}>{text}</Text>
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

export default Button;