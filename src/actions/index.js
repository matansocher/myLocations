import _ from 'lodash';
import {
  FETCH_CATEGORIES, 
  FETCH_LOCATIONS_FROM_CATEGORY,
  SET_CURRENT_CATEGORY,
  ADD_CATEGORY, 
  EDIT_CATEGORY, 
  REMOVE_CATEGORY, 
  FETCH_LOCATION, 
  ADD_OR_EDIT_LOCATION,
  REMOVE_LOCATION, 
} from '../actions/types';

export function actionFetchCategories() {
  const categories = JSON.parse(localStorage.getItem("categories"));
  return {
    type: FETCH_CATEGORIES,
    payload: categories || {}
  }
}

export function actionFetchLocations() {
  const locations = JSON.parse(localStorage.getItem("locations"));
  return {
    type: FETCH_LOCATIONS_FROM_CATEGORY,
    payload: locations || []
  }
}

export function actionSetCurrentCategory(category) {
  return {
    type: SET_CURRENT_CATEGORY,
    payload: category
  }
}

export function actionAddCategory(category) {
  const categories = JSON.parse(localStorage.getItem("categories"));
  categories.push(category);
  localStorage.setItem("categories", JSON.stringify(categories));
  return {
    type: ADD_CATEGORY,
    payload: categories
  }
}

export function actionEditCategory(oldName, newName) {
  const categories = JSON.parse(localStorage.getItem("categories"));
  const locations = JSON.parse(localStorage.getItem("locations"));
  // edit the category name
  const newCategories = categories.map(category => {
    if(category === oldName) {
      return newName;
    }
    return category;
  })
  localStorage.setItem("categories", JSON.stringify(newCategories));

  // edit the category in all the locations
  const newLocations = locations.map(location => {
    if (location.categories.includes(oldName)) {
      const index = _.findIndex(location.categories, cat => cat === oldName);
      location.categories[index] = newName
    }
    return location;
  })
  localStorage.setItem("locations", JSON.stringify(newLocations));
  return {
    type: EDIT_CATEGORY,
    payload: newCategories
  }
}

export function actionRemoveCategory(category) {
  const categories = JSON.parse(localStorage.getItem("categories"));
  const i = categories.indexOf(category);
  if (i !== -1) 
    categories.splice(i, 1)
  localStorage.setItem("categories", JSON.stringify(categories));
  return {
    type: REMOVE_CATEGORY,
    payload: categories
  }
}

export function actionFetchLocation(id) {
  const locations = JSON.parse(localStorage.getItem("locations"));
  let location = {};
  locations.map((l) => {
    if(l.id === id) {
      location = l;
    }
    return l;
  });
  return {
    type: FETCH_LOCATION,
    payload: location
  }
}

export function actionAddOrEditLocation(location) {
  const locations = JSON.parse(localStorage.getItem("locations"));
  // check if exists - delete, so we insert a new instance
  const i = _.findIndex(locations, l => l.id === location.id);
  if (i !== -1) {
    locations.splice(i, 1);
  }
  locations.push(location);
  localStorage.setItem("locations", JSON.stringify(locations));
  return {
    type: ADD_OR_EDIT_LOCATION,
    payload: locations
  }
}

export function actionRemoveLocation(location) {
  const locations = JSON.parse(localStorage.getItem("locations"));
  const i = _.findIndex(locations, l => { 
    return l.id === location.id; 
  });
  if (i !== -1) 
    locations.splice(i, 1);
  localStorage.setItem("locations", JSON.stringify(locations));
  return {
    type: REMOVE_LOCATION,
    payload: locations
  }
}
// localStorage.setItem("categoriesAndLocations", categoriesAndLocations);
