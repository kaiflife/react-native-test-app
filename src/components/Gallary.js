import React from 'react';
import { View, StyleSheet } from 'react-native';

const Gallery = ({component, propsStyles = {}, isHorizontal = false}) => {
  return (
    <View style={[styles.container, styles.horizontalContainer, propsStyles]}>
      {component}
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