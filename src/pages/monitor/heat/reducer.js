import { GET_CHARTDATA } from './actionTypes.js';
import {CHANGE_STYLESTATUS}from './actionTypes.js'; 

const defaultState = {
	ChartData: [],
	PrasureNavStatus: []
}

export default (state = defaultState, action) => {
	if (action.type === GET_CHARTDATA) {
		const newState = Object.assign({}, state);
		newState.ChartData = action.value;
		return newState;
	}
	if (action.type === CHANGE_STYLESTATUS) {
		const newState = Object.assign({}, state);
		newState.PrasureNavStatus = action.value;
		return newState;
	}
	return state;
}
