import { CHANGE_ARTICLES_TYPE } from './../actions';

const initialState = {
  type: 'all'
};

export default function articles(state = initialState, action) {
  switch (action.type) {
    case CHANGE_ARTICLES_TYPE:
      return {
        ...state,
        type: action.articlesType
      };
    default:
      return state;
  }
}
