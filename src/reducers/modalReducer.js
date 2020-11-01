import {CHANGE_MODAL_DATA, OPEN_ERROR_MODAL} from "../actions/modal/action";
import {CONNECTION_ERROR, SERVER_NOT_RESPOND} from "../constants/languages";

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
		case OPEN_ERROR_MODAL: {
			return {
				...state,
				hideTimer: 3,
				isOpenedModal: true,
				modalTitle: CONNECTION_ERROR,
				modalText: SERVER_NOT_RESPOND,
				...payload,
			}
		}
		default:
			return state
	}
}

export default modalReducer;