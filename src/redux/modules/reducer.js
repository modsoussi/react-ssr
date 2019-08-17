import { combineReducers } from 'redux';
import { hitsReducer } from './hits';

export default combineReducers({
  hits: hitsReducer,
});
