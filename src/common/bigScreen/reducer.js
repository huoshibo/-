import { GET_STYLESTATUS } from './actionTypes.js';

const defaultState = {
	PrasureNavStatus: []
}

export default (state = defaultState, action) => {
	if (action.type === GET_STYLESTATUS) {
		const newState = Object.assign({}, state);
		newState.PrasureNavStatus = action.value;
		return newState;
	}
	return state;
}

