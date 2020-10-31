import { combineReducers } from 'redux'
import theme from './themeReducer';
import auth from './authReducer';
import language from './languageReducer';

export default combineReducers({
	theme,
	auth,
	language,
});