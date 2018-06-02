import { combineReducers } from 'redux';
import categories from './reducer_categories';
import locations from './reducer_locations';
import currentCategory from './reducer_current_category';
import currentLocation from './reducer_current_location';

const rootReducer = combineReducers({
  categories,
  locations,
  currentCategory,
  currentLocation
});

export default rootReducer;