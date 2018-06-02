import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import _ from 'lodash';
import LocationItem from './LocationItem';
import { sortAlphabetic, filterByCategory } from '../actions/CommonFunctions';
import { MuiThemeProvider } from 'material-ui/styles';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import SortIcon from 'material-ui/svg-icons/content/sort';
import BackIcon from 'material-ui/svg-icons/navigation/chevron-left';

export class Locations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterOptions: [],
      filterBy: this.props.currentCategory,
      popOverFilter: false,
    }
  }

  componentDidMount() {
    const { categories } = this.props;
    if(_.isEmpty(categories)) {
      this.props.actionFetchCategories();
    }
    this.props.actionFetchLocations();
  }

  handleBackClick = () => {
    this.props.history.push("/");
  }

  navigateToRoute = (route) => {
    this.props.history.push(route);
  }

  handleFilterByChange = (e, value) => {
    this.setState({ filterBy: value });
  }

  handleFilterOptionsClick = (event) => {
    event.preventDefault();
    this.setState({
      popOverFilter: true,
      anchorEl: event.currentTarget
    });
  }

  handleRequestPopoverClose = () => {
    this.setState({ popOverFilter: false });
  };

  handleAddClick = () => {
    this.props.actionFetchLocation(); // set the current location to {}
    this.props.history.push(`/Locations/AddLocation`);
  }

  editLocation = (location) => {
    this.props.actionFetchLocation(location.id); // get the location's data
    this.props.history.push(`/Locations/AddLocation`);
  }

  removeLocation = (location) => {
    this.props.actionRemoveLocation(location)
  }

  renderFilterOptions() {
    const categories = [...this.props.categories];
    if(categories === 0) {
      return;
    }
    categories.sort().unshift("All");
    return (
      categories.map(category => {
        return (
          <MenuItem key={category} value={category} 
            primaryText={category} />
        )
      })
    )
  }

  renderLocations() {
    let { locations } = this.props;
    if(_.isEmpty(locations)) {
      return (
        <h1>No Locations Yet</h1>
      )
    }
    const category = this.state.filterBy;
    locations = filterByCategory(locations, category);
    locations = sortAlphabetic(locations);
    return (
      locations.map((location) => {
        return (
        <LocationItem key={location.name} location={location}
          navigateToRoute={this.navigateToRoute}
          editLocation={this.editLocation}
          removeLocation={this.removeLocation} />
        )
      })
    )
  }

  render() {
    const { filterBy } = this.state;
    const header = filterBy && filterBy !== "All" ? `Locations: ${filterBy}` : "Locations";
    return (
      <MuiThemeProvider>
        <div className="container">

          <FlatButton className="pull-left back-button-user-info" label="Back" primary={true} onClick={this.handleBackClick}>
            <BackIcon className="back-button" />
          </FlatButton>
          <br />
          {/* <button type="button" className="btn" onClick={this.handleBackClick}>Back</button> */}
          <h1>{header}</h1>

          <RaisedButton className="pull-right" label="Filter By" icon={<SortIcon />}
            onClick={this.handleFilterOptionsClick}
          />

          <Popover
            open={this.state.popOverFilter}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={this.handleRequestPopoverClose}
          >
            <Menu value={this.state.filterBy} onChange={this.handleFilterByChange}>
              {this.renderFilterOptions()}
            </Menu>
          </Popover>

          {this.renderLocations()}
          <FloatingActionButton className="floatting-action-button" onClick={this.handleAddClick}>
            <ContentAdd />
          </FloatingActionButton>
        </div>
      </MuiThemeProvider>
    )
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories,
    locations: state.locations,
    currentCategory: state.currentCategory
  }
}

export default connect(mapStateToProps, actions)(Locations)
