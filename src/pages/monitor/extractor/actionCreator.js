import { GET_DIAGRAMDATA, GET_TABLEDATA } from './actionTypes.js';

export const getChartData = (value)=> ({
	type: GET_DIAGRAMDATA,
	value: value
})

export const getTableData = (value) => ({
	type: GET_TABLEDATA,
	value: value
})