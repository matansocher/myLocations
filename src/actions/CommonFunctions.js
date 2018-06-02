import React from 'react';
import _ from 'lodash';
// import { MuiThemeProvider } from 'material-ui/styles';

export function createLocationId() {
  let id = "";
  const possible = "abcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 10; i++)
    id += possible.charAt(Math.floor(Math.random() * possible.length));

  return id;
}

export function getShortName(name) {
  const array = name.split(" "); // words to array
  return array[1] ? `${array[0][0]} ${array[1][0]}` : array[0][0];
}

export function sortAlphabetic(array = []) {
  if(array.length === 0) {
    return [];
  }
  return array.sort((a, b) => {
    return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
  });
}

export function filterByCategory(array = [], category) {
  if(array.length === 0) {
    return [];
  }
  if(!category || category === "All") { // if there is no category selected, dont filter
    return array;
  }
  return _.filter(array, location => {
    if (location.categories.includes(category)) 
      return location;
  });
}

export function doesLocationsContainsCategory(category) {
  const locations = JSON.parse(localStorage.getItem("locations"));
  let bool = false;
  locations.map((l) => {
    if (l.categories.includes(category))
      bool = true;
    return l;
  })
  return bool;
}

export function checkIfAllFieldsEntered(name, address, categories, lng, lat) {
  let errorArray = [];
  if(name === '') {
    errorArray.push("Please Enter A Valid Name");
  }
  if(address === '') {
    errorArray.push("Please Enter A Valid Address");
  }
  if(categories.length === 0) {
    errorArray.push("Please Enter At Least One Category");
  }
  // if(lng === 0) {
  //   errorArray.push("Please Enter A Valid Longtitude Value");
  // }
  // if(lat === 0) {
  //   errorArray.push("Please Enter A Valid Latitude Value");
  // }
  return (
    errorArray.map((e) => {
      return <p key={e}>{e}</p>
    })
  )
  // console.log(errorArray)
  // return errorArray;
}