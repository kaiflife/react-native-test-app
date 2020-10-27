import {
	CHANGE_CURRENT_THEME,
	FONTS_LOADED,
} from "../actions/styles/action";

const initialState = {
	currentThemeName: 'dark',
	currentTheme: {},
	areFontsReady: false,
};

const navigationReducer = (state = initialState, action) => {
	const {payload} = action;
	switch (action.type) {
		case FONTS_LOADED: {
			return {...state, areFontsReady: true};
		}
		case CHANGE_CURRENT_THEME: {
			return  {
				...state,
				currentTheme: payload.theme,
				currentThemeName: payload.themeName
			};
		}
		default:
			return state
	}
}

export default navigationReducer;