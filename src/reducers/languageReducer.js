import {CHANGE_CURRENT_LANGUAGE} from "../actions/language/action";

const initialState = {
	languageName: '',
	languageWords: null,
};

const languageReducer = (state = initialState, action) => {
	const {payload} = action;
	switch (action.type) {
		case CHANGE_CURRENT_LANGUAGE: {
			return  {
				...state,
				languageWords: payload.languageWords,
				languageName: payload.languageName,
			};
		}
		default:
			return state
	}
}

export default languageReducer;