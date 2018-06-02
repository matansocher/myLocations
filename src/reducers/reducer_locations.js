// import _ from 'lodash';
import { 
  FETCH_LOCATIONS_FROM_CATEGORY,
  ADD_OR_EDIT_LOCATION, 
  REMOVE_LOCATION 
} from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_LOCATIONS_FROM_CATEGORY:
      return action.payload;
    case ADD_OR_EDIT_LOCATION:
      return action.payload;
    case REMOVE_LOCATION:
      return action.payload;
    default:
      return state;
  }
}