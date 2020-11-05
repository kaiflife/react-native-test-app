import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomFontText from "./CustomFontText";
import {useSelector} from "react-redux";

const Gallery = ({components = [], noComponentsText = 'No items', propsStyles = {}, isHorizontal = false}) => {
  const currentTheme = useSelector(state => state.themeReducer.currentTheme);
  const languageWords = useSelector(state => state.languageReducer.languageWords);
  return (
    <View style={[styles.container, styles.horizontalContainer, propsStyles]}>
      {!components.length ? <CustomFontText propsStyles={[currentTheme.noBoards]} text={languageWords[noComponentsText]} /> : components}
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  horizontalContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})

export default React.memo(Gallery);