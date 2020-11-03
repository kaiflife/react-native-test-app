import {CHANGE_MODAL_DATA, OPEN_ERROR_MODAL, CLOSE_MODAL} from "../actions/modal/action";
import {CONNECTION_ERROR, SERVER_NOT_RESPOND} from "../constants/languages";

const initialState = {
	isOpenedModal: false,
	modalTitle: '',
	modalButtonTitle: '',
	hideTimer: null,
	modalInputsInfo: [],
	modalButtonApply: {},
	modalButtonCancel: {},
};

const modalReducer = (state = initialState, action) => {
	const {payload} = action;
	switch (action.type) {
		case CHANGE_MODAL_DATA: {
			const newInputsInfo = state.modalInputsInfo.slice();
			let newInfo = payload;
			const { newInputInfo } = payload;
			if(newInputInfo) {
				const newThisInput = {...newInputsInfo[newInputInfo.index], value: newInputInfo.value};
				newInputsInfo.splice(newInputInfo.index, 1, newThisInput);
				newInfo = {modalInputsInfo: newInputsInfo};
			}
			return  {
				...state,
				...newInfo
			};
		}
		case CLOSE_MODAL: {
			return initialState;
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