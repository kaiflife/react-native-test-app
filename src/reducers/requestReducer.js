import {START_REQUEST_LOADING} from "../actions/request/action";

const initialState = {
	isRequestLoading: false,
};

const requestReducer = (state = initialState, action) => {
	const {payload} = action;
	switch (action.type) {
		case START_REQUEST_LOADING: {
			return  {
				...state,
				isRequestLoading: payload,
			};
		}
		default:
			return state
	}
}

export default requestReducer;