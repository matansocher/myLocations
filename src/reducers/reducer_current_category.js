// import _ from 'lodash';
import { SET_CURRENT_CATEGORY } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case SET_CURRENT_CATEGORY:
      return action.payload;
    default:
      return state;
  }
}