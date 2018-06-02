import React, { Component } from 'react';
import { getShortName } from '../actions/CommonFunctions';
import { MuiThemeProvider } from 'material-ui/styles';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FloatingActionButton from 'material-ui/FloatingActionButton';
// import { connect } from 'react-redux';
// import * as actions from '../actions/index';

class LocationItem extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  handleClick = () => {
    const { id } = this.props.location;
    this.props.navigateToRoute(`Locations/${id}`);
  }

  handleEditClick = () => {
    this.props.editLocation(this.props.location);
  }

  handleRemoveClick = () => {
    this.props.removeLocation(this.props.location);
  }

  render() {
    const { name, categories, address } = this.props.location;
    return (
      <MuiThemeProvider>
        <div className="list-group-item location">
          <div onClick={this.handleClick}>
            <FloatingActionButton secondary={true}>
              <strong className="circle">{getShortName(name)}</strong>
            </FloatingActionButton>
            <h3>{name}</h3>
            <h5>Categories: {categories.toString()}</h5>
            <h5>Address: {address}</h5>
          </div>

          <div className="location-menu">
            <IconMenu
              iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
              anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
              targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
              <MenuItem primaryText="Edit" onClick={this.handleEditClick} />
              <MenuItem primaryText="Remove" onClick={this.handleRemoveClick} />
            </IconMenu>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default LocationItem;
