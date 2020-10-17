import React from "react";
import { registerRootComponent } from 'expo';
import {createStore} from "redux";
import {Provider} from "react-redux";
import rootReducer from './reducers/index';

import App from './App';

const store = createStore(rootReducer);

const AppStorage = () => {
	return (
		<Provider store={store}>
			<App />
		</Provider>
	);
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(AppStorage);
