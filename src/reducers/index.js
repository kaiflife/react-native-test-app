import { combineReducers } from 'redux'
import themeReducer from './themeReducer';
import authReducer from './authReducer';
import languageReducer from './languageReducer';
import requestReducer from './requestReducer'
import boardsReducer from "./boardsReducer";
import modalReducer from "./modalReducer";

export default combineReducers({
	themeReducer,
	authReducer,
	languageReducer,
	requestReducer,
	boardsReducer,
	modalReducer,
});