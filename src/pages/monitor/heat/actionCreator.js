import { GET_CHARTDATA } from './actionTypes.js';
import { CHANGE_STYLESTATUS } from './actionTypes.js';

export const getChartData = (value) => ({
	type: GET_CHARTDATA,
	value: value
})
export const ChangeStatus = (value) => ({
	type: CHANGE_STYLESTATUS,
	value: value
})
