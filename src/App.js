import React, { useState, useRef, useEffect }  from 'react';
import {StyleSheet, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {changeTheme} from "./helpers/addNewTheme";
import {useDispatch, useSelector} from "react-redux";
import {AuthIcon, BoardsIcon, LoaderSvg, OneBoardIcon, RegistrationIcon} from "./components/Svgs";
import AuthScreen from "./screens/AuthScreen";
import {CHANGE_CURRENT_THEME} from "./actions/theme/action";
import {changeLanguage} from "./helpers/changeLanguage";
import {CHANGE_CURRENT_LANGUAGE} from "./actions/language/action";
import languages from "./constants/languages";
import RegistrationScreen from "./screens/RegistrationScreen";
import Modal from "./components/Modal";
import SettingsScreen from "./screens/SettingsScreen";
import AllBoardsScreen from "./screens/AllBoardsScreen";
import {_getStoreData} from "./helpers/storage";
import {changeAuthData} from "./actions/auth/action";
import { SettingsIcon } from "./components/Svgs";
import BoardScreen from "./screens/BoardScreen";
import {changeBoardsData} from "./actions/boards";

const Tab = createBottomTabNavigator();

export default function App() {
  const dispatch = useDispatch();
  const navigationRef = useRef(null);
  const [isLoadingTheme, setIsLoadingTheme] = useState(true);
  const selectedBoardId = useSelector(state => state.boardsReducer.selectedBoardId);
  const accessToken = useSelector(state => state.authReducer.accessToken);
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
        const accessToken = await _getStoreData('tokens');
        if(accessToken) {
          dispatch(changeAuthData({accessToken}));
        }
        setIsLoadingTheme(false);
      })
      .catch(e => console.error('ERROR PRELOADING', e));
  }, []);

  useEffect(() => {
    if(!accessToken) {
      dispatch(changeBoardsData({selectedBoardId: null}));
      if(firstName && navigationRef.current && navigationRef.current.reset) {
        navigationRef.current.reset({
          index: 0,
          routes: [
            {name: 'Authorization'}
          ]
        });
      }
    }
  }, [accessToken, firstName]);

  const AuthNavigator = () => {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name='Authorization'
          options={{tabBarIcon: ({color}) => <AuthIcon color={color} />}}
          component={AuthScreen}
        />
        <Tab.Screen
          name='Registration'
          options={{tabBarIcon: ({color}) => <RegistrationIcon color={color} />}}
          component={RegistrationScreen}
        />
      </Tab.Navigator>
    );
  }

  const HomeNavigator = () => {
    return (
      <Tab.Navigator >
        <Tab.Screen
          name='Boards'
          component={AllBoardsScreen}
          options={{tabBarIcon: ({color}) => <BoardsIcon color={color} />}}
        />
        {
          selectedBoardId &&
          <Tab.Screen
            name='Board'
            options={{tabBarIcon: ({color}) => <OneBoardIcon color={color}/>}}
            component={BoardScreen}
          />
        }
        <Tab.Screen
          options={{tabBarIcon: ({color}) => <SettingsIcon color={color}/>}}
          name='Settings'
          component={SettingsScreen}
        />
      </Tab.Navigator>
    );
  }

  const navigation = (
    <NavigationContainer ref={navigationRef}>
      {accessToken ? <HomeNavigator /> : <AuthNavigator />}
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
