import { combineReducers } from 'redux'
import theme from './themeReducer';
import auth from './authReducer';
import language from './languageReducer';
import request from './requestReducer'

export default combineReducers({
	theme,
	auth,
	language,
	request,
});