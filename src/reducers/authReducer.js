import {
	AUTH_SUCCESS,
	AUTH_FAILED,
	REGISTRATION_FAILED,
	CHANGE_AUTH_DATA,
} from "../actions/auth/action";

const initialState = {
	token: null,
	firstName: '',
	lastName: '',
	password: '',
	email: '',
	error: '',
};

const themeReducer = (state = initialState, action) => {
	const {payload} = action;
	switch (action.type) {
		case CHANGE_AUTH_DATA: {
			return {...state, ...payload}
		}
		case AUTH_SUCCESS: {
			return  {
				...state,
				token: payload.token,
			};
		}
		case REGISTRATION_FAILED || AUTH_FAILED: {
			return {
				...state,
				error: payload.error,
			}
		}
		default:
			return state
	}
}

export default themeReducer;