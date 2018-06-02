import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import _ from 'lodash';
import { createLocationId } from '../actions/CommonFunctions';
import GoogleMap from './GoogleMap';
import { checkIfAllFieldsEntered } from '../actions/CommonFunctions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AutoComplete from 'material-ui/AutoComplete';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import BackIcon from 'material-ui/svg-icons/navigation/chevron-left';

class LocationAdd extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      categories: [],
      categoryPicker: '',
      lng: 0,
      lat: 0,
      errorMessage: '',
      editing: false
    }
  }

  componentDidMount() {
    if(_.isEmpty(this.props.categories)) {
      this.props.actionFetchCategories();
    }
    if(!_.isEmpty(this.props.location)) {
      const { name, address, categories, coordinates } = this.props.location;
      this.setState({ 
        name, 
        address, 
        categories, 
        lng: coordinates.lng, 
        lat: coordinates.lat, 
        editing: true });
    }
  }

  handleChange = (e) => {
    var change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  }

  handleSaveClick = () => {
    // check that all fields were entered
    const { name, address, categories, lng, lat } = this.state;
    const errorMessage = checkIfAllFieldsEntered(name, address, categories, lng, lat);
    if (errorMessage.length !== 0) {
      this.setState({ errorMessage })
      return;
    }

    // if editing, there will be an id, if not - a new one is generated
    const { location } = this.props;
    const id = location ? location.id : createLocationId();
    const newLocation = {
      id, 
      name, 
      address, 
      categories, 
      coordinates: {
        lng, lat
      }
    };
    this.props.actionAddOrEditLocation(newLocation);
    this.props.history.push('/Locations');
  }

  handleUpdateInput = (categoryPicker) => {
    this.setState({ categoryPicker });
  };

  handleNewRequest = (categoryPicker) => {
    const categoryArray = this.state.categories;
    if (categoryArray.includes(categoryPicker)) { // incluse, remove it
      const index = categoryArray.indexOf(categoryPicker);
      categoryArray.splice(index, 1);
    }
    else { // doesent include, add it to the array
      categoryArray.push(categoryPicker);
    }
    this.setState({ categories: categoryArray, categoryPicker: '' });
  };

  handleBackClick = () => {
    this.props.history.push('/Locations');
  }

  renderCategories() {
    const { categories } = this.state;
    if(categories.length === 0)
      return;
    return (
      categories.map((category) => {
        return (
          <li key={category}>{category}</li>
        )
      })
    )
  }

  render() {
    const header = this.state.editing ? "Edit a Location" : "Add a New Location";
    return (
      <MuiThemeProvider>
        <div className="container">

          <FlatButton className="pull-left back-button-user-info" label="Back" primary={true} onClick={this.handleBackClick}>
            <BackIcon className="back-button" />
          </FlatButton>
          <br />
          {/* <button type="button" className="btn" onClick={this.handleBackClick}>Back</button> */}
          
          <button type="button" className="btn btn-success save-button" 
            onClick={this.handleSaveClick}>
            Save
          </button>
          <br />
          <h2>{header}</h2>
          <br /><br />
          {this.state.errorMessage ?
            <div className="alert alert-danger">
              <strong>{this.state.errorMessage}</strong>
            </div>
            : <span />
          }
          
          <div>
            <TextField floatingLabelText="Location Name" name="name"
              value={this.state.name} onChange={this.handleChange}
            /> 
            <br />
            <TextField floatingLabelText="Location Address" name="address"
              value={this.state.address} onChange={this.handleChange}
            /> 
            <br /><br />
            <h3>Categories:</h3> { this.renderCategories() }
            <br /><br />
            <h5>Click to add or remove a category:</h5>
            <AutoComplete
              hintText="Choose Category"
              searchText={this.state.categoryPicker}
              onUpdateInput={this.handleUpdateInput}
              onNewRequest={this.handleNewRequest}
              dataSource={this.props.categories}
              filter={(categoryPicker, key) => (key.indexOf(categoryPicker) !== -1)}
              openOnFocus={true}
            />
            <br /><br /><br />
            <GoogleMap lat={32.086795} lng={34.7902292} />
            <br />
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories,
    location: state.currentLocation
  };
}

export default connect(mapStateToProps, actions)(LocationAdd);
