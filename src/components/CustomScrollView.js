import React from 'react';
import { ScrollView } from "react-native";
import { useSelector } from "react-redux";

const CustomScrollView = ({propsStyles, component}) => {
  const currentTheme = useSelector(state => state.themeReducer.currentTheme);
  return (
    <ScrollView style={[currentTheme.boardsContainer, propsStyles]}>
      {component}
    </ScrollView>
  );
}

export default React.memo(CustomScrollView);