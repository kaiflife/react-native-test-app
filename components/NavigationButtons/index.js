import React from 'react';
import { View, StyleSheet } from "react-native";
import Button from "../Button";

const buttons = [
  {route: 'Home', text: 'Home'},
  {route: 'SecondScreen', text: 'Second Screen'},
];

const NavigationButtons = ({ currentRoute, onPress, hideNavbar = false }) => {
  if(hideNavbar) return <></>;

  const onPressNavButton = route => currentRoute !== route && onPress(route);

  const buttonsMap = buttons.map(button => {
    return <Button onPress={() => onPressNavButton(button.route)} text={button.text} />
  });

  return <View style={styles.container}>{buttonsMap}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 0.07,
    flexDirection: 'row',
    backgroundColor: 'red',
  },
})

export default NavigationButtons;