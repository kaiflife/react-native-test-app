import React from 'react';
import { View, StyleSheet } from "react-native";
import Button from "../Button";

const Navbar = ({ style, currentRoute, onPress, visible = true, buttons }) => {
  if(visible) return <></>;

  const cloneButtons = buttons.slice();
  const defaultValuesButtons = buttons.map((button, index) => {
    if(button.visible === undefined) {
      cloneButtons[index].visible = true;
    }
  })

  const onPressNavButton = (route) => {
    currentRoute !== route && onPress(route);
  }

  const buttonsMap = defaultValuesButtons.map(button => {
    const buttonStyles = button.styles ? {container: button.styles} : {};
    const textStyles = button.textStyles ? {text: button.textStyles} : {};
    const styles = {...buttonStyles, ...textStyles};
    const textFont = button.textFont || '';
    return <Button textFont={textFont} styles={styles} onPress={() => onPressNavButton(button.route)} text={button.text} key={button.route} />
  });

  return <View style={[navbarStyles.navbarContainer, style]}>{buttonsMap}</View>;
};

const navbarStyles = StyleSheet.create({
  navbarContainer: {
    flex: 0.07,
    flexDirection: 'row',
    backgroundColor: 'red',
  },
})

export default Navbar;