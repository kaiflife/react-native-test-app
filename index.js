import React from "react";
import {registerRootComponent} from 'expo';
import {createStore} from "redux";
import {Provider} from "react-redux";
import rootReducer from './src/reducers/index';
import App from './src/App';

const store = createStore(rootReducer);

const AppStorage = () => {
	return (
		<Provider store={store}>
			<App />
		</Provider>
	);
}

registerRootComponent(AppStorage);