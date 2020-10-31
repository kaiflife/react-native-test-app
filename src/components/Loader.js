import React, {useRef} from 'react';
import {View, StyleSheet, Animated, Easing} from 'react-native';
import {LoaderSvg} from "./Svgs";

const Loader = ({propsStyles = {}}) => {

  const RotateValueHolder = useRef(new Animated.Value(0)).current;

  const StartImageRotateFunction = (result) => {
    if(result && !result.finished){
      return;
    }
    RotateValueHolder.setValue(0);

    Animated.timing(RotateValueHolder, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
    }).start(StartImageRotateFunction);
  };

  const RotateData = RotateValueHolder.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={[styles.container, propsStyles.container]}>
      <View style={styles.imageContainer}>
        <Animated.Image
          style={{
            width: 70,
            height: 70,
            transform: [{ rotate: RotateData }]
          }}
          source={LoaderSvg}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 10,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  text: {
    color: 'white',
    position: 'absolute',
    top: '10%',
    fontSize: 23,
    lineHeight: 27,
    fontWeight: 'bold',
  },
});

export default React.memo(Loader);