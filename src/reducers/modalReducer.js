import {CHANGE_MODAL_DATA} from "../actions/modal/action";

const initialState = {
	isOpenedModal: false,
	modalTitle: '',
	modalButtonTitle: '',
	hideTimer: null,
	modalInputText: '',
};

const modalReducer = (state = initialState, action) => {
	const {payload} = action;
	switch (action.type) {
		case CHANGE_MODAL_DATA: {
			return  {
				...state,
				...payload
			};
		}
		default:
			return state
	}
}

export default modalReducer;