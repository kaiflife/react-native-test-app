import React from "react";
import {registerRootComponent} from 'expo';
import {applyMiddleware, createStore} from "redux";
import thunkMiddleware from 'redux-thunk';
import {Provider} from "react-redux";
import rootReducer from './src/reducers/index';
import App from './src/App';

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

const AppStorage = () => {
	return (
		<Provider store={store}>
			<App />
		</Provider>
	);
}

registerRootComponent(AppStorage);