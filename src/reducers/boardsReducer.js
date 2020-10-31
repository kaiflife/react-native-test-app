import {BOARDS_REQUEST_FAILED, CHANGE_BOARDS_DATA} from "../actions/boards/action";

const initialState = {
	boards: [],
	users: [],
	error: '',
};

const boardsReducer = (state = initialState, action) => {
	const {payload} = action;
	switch (action.type) {
		case CHANGE_BOARDS_DATA: {
			return {...state, ...payload, error: ''}
		}
		case BOARDS_REQUEST_FAILED: {
			return {
				...state,
				error: payload.error,
			}
		}
		default:
			return state
	}
}

export default boardsReducer;