import React, { useState, useEffect }  from 'react';
import {StyleSheet, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {changeTheme} from "./helpers/addNewTheme";
import {useSelector} from "react-redux";
import {AnimatedLoaderSvg} from "./components/Svgs";
import Home from "./screens/Home";
import SecondScreen from "./screens/SecondScreen";
import {CHANGE_CURRENT_THEME} from "./actions/styles/action";

const Tab = createBottomTabNavigator();

export default function App() {
  const currentThemeName = useSelector(state => state.theme.currentThemeName);
  const [isLoadingTheme, setIsLoadingTheme] = useState(true);

  useEffect(() => {
    changeTheme({ currentThemeName})
      .then((theme) => {
        dispatch({ type: CHANGE_CURRENT_THEME, payload: {theme, themeName: currentThemeName}});
        setIsLoadingTheme(false)
      });
  }, []);

  const navigation = (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Settings" component={SecondScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );

  return (
    <View style={styles.container}>
      {isLoadingTheme ? <AnimatedLoaderSvg /> : navigation}
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
