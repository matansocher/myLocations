import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import App from './components/App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
// import App from './components/App';

const createStoreWithMiddleware = applyMiddleware()(createStore);
const store = createStoreWithMiddleware(reducers);

const categories = ["Restaurants", "Views", "Theaters"];
const locations = [
  {
    id: "jd73vks94b",
    name: "Dominos Pizza", 
    categories: ["Restaurants"], 
    address: "Ktovet",
    coordinates: {
      lng: 34.9864112,
      lat: 32.7904282
    }
  },
  {
    id: "1ifc04ikm7",
    name: "Yosemite National Park", 
    categories: ["Views"], 
    address: "Ktovet",
    coordinates: {
      lng: -119.4858274,
      lat: 37.8513691
    }
  },
  {
    id: "9tujcne43k",
    name: "North theater", 
    categories: ["Theaters", "Restaurants"], 
    address: "Ktovet",
    coordinates: {
      lng: 35.0762103,
      lat: 32.8218929
    }
  },
];
localStorage.setItem("categories", JSON.stringify(categories));
localStorage.setItem("locations", JSON.stringify(locations));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
