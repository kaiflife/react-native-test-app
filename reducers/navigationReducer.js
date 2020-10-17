import {
	CHANGE_CURRENT_ROUTE,
	CHANGE_NAVBAR_OPTIONS,
} from "../actions/navigation/action";

const initialState = {
	currentRoute: '',
	screens: [],
	navbarOptions: {
		visibility: true,
		buttons: [],
	}
};

const navigationReducer = (state = initialState, action) => {
	const {payload} = action;
	switch (action.type) {
		case CHANGE_CURRENT_ROUTE: {
			return {...state, currentRoute: payload};
		}
		case CHANGE_NAVBAR_OPTIONS: {
			const navbarOptions = {...state.navbarOptions, visibility: payload};
			return  {...state, navbarOptions}
		}
		default:
			return state
	}
}

export default navigationReducer;