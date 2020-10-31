import {CHANGE_CURRENT_THEME} from "../actions/theme/action";

const initialState = {
	currentThemeName: null,
	currentTheme: {},
};

const themeReducer = (state = initialState, action) => {
	const {payload} = action;
	switch (action.type) {
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

export default themeReducer;