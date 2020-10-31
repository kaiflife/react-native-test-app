import React, { useState, useEffect }  from 'react';
import {StyleSheet, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createStackNavigator} from "@react-navigation/stack";
import {changeTheme} from "./helpers/addNewTheme";
import {useDispatch, useSelector} from "react-redux";
import {LoaderSvg} from "./components/Svgs";
import AuthScreen from "./screens/AuthScreen";
import {CHANGE_CURRENT_THEME} from "./actions/theme/action";
import {changeLanguage} from "./helpers/changeLanguage";
import {CHANGE_CURRENT_LANGUAGE} from "./actions/language/action";
import languages from "./constants/languages";
import RegistrationScreen from "./screens/RegistrationScreen";
import Loader from "./components/Loader";

const Tab = createBottomTabNavigator();

export default function App() {
  const dispatch = useDispatch();
  const [isLoadingTheme, setIsLoadingTheme] = useState(true);
  const isRequestLoading = useSelector(state => state.request.isRequestLoading);
  const token = useSelector(state => state.auth.token);

  const preloadSettings = async () => {
    const languageName = await changeLanguage();
    const languageWords = languages[languageName];
    dispatch({ type: CHANGE_CURRENT_LANGUAGE, payload: {languageName, languageWords}});

    const {theme, themeName} = await changeTheme();
    dispatch({ type: CHANGE_CURRENT_THEME, payload: {theme, themeName}});
  }

  useEffect(() => {
    preloadSettings()
      .then(() => setIsLoadingTheme(false))
      .catch(e => console.error('ERROR PRELOADING', e));
  }, []);

  const Settings = () => {
    const HomeStack = createStackNavigator();
    return (
      <HomeStack.Navigator initialScreen='Authorization' headerMode='none'>
        <HomeStack.Screen name='Registration' component={Settings} />
      </HomeStack.Navigator>
    )
  };

  const AuthNavigator = () => {
    return (
      <Tab.Navigator>
        <Tab.Screen name='Authorization' component={AuthScreen} />
        <Tab.Screen name='Registration' component={RegistrationScreen} />
      </Tab.Navigator>
    );
  }

  const HomeNavigator = () => {
    return (
      <Tab.Navigator>
        <Tab.Screen name='Boards' component={BoardsScreen} />
        <Tab.Screen name='Board' component={BoardScreen} />
        <Tab.Screen  name='Settings' component={Settings} />
      </Tab.Navigator>
    );
  }

  const navigation = (
    <NavigationContainer>
      {token ? <HomeNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );

  return (
    <View style={styles.container}>
      {isRequestLoading && <Loader />}
      {isLoadingTheme ? <LoaderSvg /> : navigation}
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
