import React, {useState} from "react";
import {AppLoading, registerRootComponent} from 'expo';
import {createStore} from "redux";
import {Provider} from "react-redux";
import rootReducer from './src/reducers/index';
import App from './src/App';

const store = createStore(rootReducer);

const AppStorage = () => {
	const [isLoadedApp, loadApp] = useState(false);

	if(!isLoadedApp) return <AppLoading onFinish={() => loadApp(true)} />;

	return (
		<Provider store={store}>
			<App />
		</Provider>
	);
}

registerRootComponent(AppStorage);