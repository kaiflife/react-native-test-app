import {
	AUTH_SUCCESS,
	AUTH_REQUEST_FAILED,
	CHANGE_AUTH_DATA,
	CLEAR_AUTH_DATA,
} from "../actions/auth/action";

const initialState = {
	accessToken: null,
	id: null,
	refreshToken: '',
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
				accessToken: payload.accessToken,
			};
		}
		case AUTH_REQUEST_FAILED: {
			return {
				...state,
				error: payload.error,
			}
		}
		case CLEAR_AUTH_DATA: {
			return initialState;
		}
		default:
			return state
	}
}

export default themeReducer;