import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Navigator from "./navigator";
import NavigationButtons from "./components/NavigationButtons";
import Home from "./screens/Home";
import SecondScreen from "./screens/SecondScreen";

export default function App() {
  const [currentRoute, setCurrentRoute] = useState('Home');

  const screens = [
    {component: Home, params: '', route: 'Home', options: {}},
    {component: SecondScreen, params: '', route: 'SecondScreen', options: {}},
  ];

  return (
    <View style={styles.container}>
      <Navigator route={currentRoute} screens={screens} />
      <NavigationButtons currentRoute={currentRoute} onPress={setCurrentRoute} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    justifyContent: 'space-between',
  },
});
