import { combineReducers } from 'redux';
import { reducer as heatReducer } from '../pages/monitor/heat';
import { reducer as extractorReducer } from '../pages/monitor/extractor';
import { reducer as bigscreenReducer } from '../common/bigScreen';

export default combineReducers({
	heat: heatReducer,
	extractor: extractorReducer,
	bigscreen: bigscreenReducer
})