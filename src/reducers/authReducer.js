import {
	AUTH_SUCCESS,
	AUTH_REQUEST_FAILED,
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
			return {...state, ...payload, error: ''}
		}
		case AUTH_SUCCESS: {
			return  {
				...state,
				token: payload.token,
			};
		}
		case AUTH_REQUEST_FAILED: {
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