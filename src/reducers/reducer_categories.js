// import _ from 'lodash';
import { 
  FETCH_CATEGORIES, 
  ADD_CATEGORY, 
  EDIT_CATEGORY, 
  REMOVE_CATEGORY 
} from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return action.payload;
    case ADD_CATEGORY:
      return action.payload;
    case EDIT_CATEGORY:
      return action.payload;
    case REMOVE_CATEGORY:
      return action.payload;
    default:
      return state;
  }
}