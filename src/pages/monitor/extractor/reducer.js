import { GET_DIAGRAMDATA, GET_TABLEDATA } from './actionTypes.js';

const defaultState = {
	DiagramData: [],
	TableData: []
}

export default (state = defaultState, action) => {
	if(action.type === GET_DIAGRAMDATA) {
		const newState = Object.assign({}, state);
		newState.DiagramData = action.value;
		return newState;
	}

	if(action.type === GET_TABLEDATA) {
		const newState = Object.assign({}, state);
		newState.DiagramData = action.value;
		return newState;
	}
	
	return state;
}
