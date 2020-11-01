import {
	AUTH_SUCCESS,
	AUTH_REQUEST_FAILED,
	CHANGE_AUTH_DATA,
	CLEAR_AUTH_DATA,
} from "../actions/auth/action";

const initialState = {
	token: null,
	firstName: 'pavel',
	lastName: 'petrunkin',
	password: 'qwe123XD',
	email: 'test@mail.ru',
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
		case CLEAR_AUTH_DATA: {
			return initialState;
		}
		default:
			return state
	}
}

export default themeReducer;