import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import articles from './articles';

const rootReducer = combineReducers({
  articles,
  routing: routerReducer
});

export default rootReducer;
