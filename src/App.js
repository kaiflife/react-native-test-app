import React, { useState, useRef, useEffect }  from 'react';
import {StyleSheet, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {changeTheme} from "./helpers/addNewTheme";
import {useDispatch, useSelector} from "react-redux";
import {BoardsIcon, LoaderSvg} from "./components/Svgs";
import AuthScreen from "./screens/AuthScreen";
import {CHANGE_CURRENT_THEME} from "./actions/theme/action";
import {changeLanguage} from "./helpers/changeLanguage";
import {CHANGE_CURRENT_LANGUAGE} from "./actions/language/action";
import languages from "./constants/languages";
import RegistrationScreen from "./screens/RegistrationScreen";
import Modal from "./components/Modal";
import SettingsScreen from "./screens/SettingsScreen";
import BoardsScreen from "./screens/BoardsScreen";
import {_getStoreData} from "./helpers/storage";
import {changeAuthData} from "./actions/auth";
import { SettingsIcon } from "./components/Svgs";

const Tab = createBottomTabNavigator();

export default function App() {
  const dispatch = useDispatch();
  const navigationRef = useRef(null);
  const [isLoadingTheme, setIsLoadingTheme] = useState(true);
  const token = useSelector(state => state.authReducer.token);
  const firstName = useSelector(state => state.authReducer.firstName);

  const preloadSettings = async () => {
    const languageName = await changeLanguage();
    const languageWords = languages[languageName];
    dispatch({ type: CHANGE_CURRENT_LANGUAGE, payload: {languageName, languageWords}});

    const {theme, themeName} = await changeTheme();
    dispatch({ type: CHANGE_CURRENT_THEME, payload: {theme, themeName}});
  }

  useEffect(() => {
    preloadSettings()
      .then(async () => {
        const token = await _getStoreData('tokens');
        if(token) {
          dispatch(changeAuthData({token}));
        }
        setIsLoadingTheme(false);
      })
      .catch(e => console.error('ERROR PRELOADING', e));
  }, []);

  useEffect(() => {
    if(!token && firstName && navigationRef.current) {
      console.log(navigationRef);
      if(navigationRef.current.reset) {
        navigationRef.current.reset({
          index: 0,
          routes: [
            {name: 'Authorization'}
          ]
        });
      }
    }
  }, [token, firstName]);

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
      <Tab.Navigator >
        <Tab.Screen
          name='Boards'
          component={BoardsScreen}
          options={{tabBarIcon: ({color}) => (<BoardsIcon color={color} />)}}
        />
        <Tab.Screen
          options={{tabBarIcon: ({color}) => (<SettingsIcon color={color}/>)}}
          name='Settings'
          component={SettingsScreen}
        />
        {/*{boardId && <Tab.Screen name='Board' component={BoardScreen} />}*/}
      </Tab.Navigator>
    );
  }

  const navigation = (
    <NavigationContainer ref={navigationRef}>
      {token ? <HomeNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );

  return (
    <View style={styles.container}>
      <Modal />
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
