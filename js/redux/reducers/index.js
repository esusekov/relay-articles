import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import articles from './articles';

/**
 * Combination of several reducers
 * http://redux.js.org/docs/basics/Reducers.html
 * http://redux.js.org/docs/api/combineReducers.html
 *
 * @type {Function}
 */
const rootReducer = combineReducers({
  articles,
  routing: routerReducer
});

export default rootReducer;
