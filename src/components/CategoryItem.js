import React, { Component } from 'react';
import { getShortName } from '../actions/CommonFunctions';
import { MuiThemeProvider } from 'material-ui/styles';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
// import { connect } from 'react-redux';
// import * as actions from '../actions/index';

class CategoryItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      category: this.props.category
    }
  }

  handleChange = (e) => {
    var change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  }

  handleClick = () => {
    const { category } = this.props;
    this.props.fetchCategory(category);
  }

  handleEditClick = () => {
    this.setState({ editing: true })
    // this.props.editCategory(this.props.category);
  }

  handleSaveClick = () => {
    const oldCategory = this.props.category;
    const newCategory = this.state.category;
    this.props.editCategory(oldCategory, newCategory);
  }

  handleCancelClick = () => {
    this.setState({ editing: false });
  }

  handleRemoveClick = () => {
    this.props.removeCategory(this.props.category);
  }

  render() {
    const name = this.props.category;
    return (
      <MuiThemeProvider>
        <div className="list-group-item category">
          {this.state.editing ?
            <div>
              <TextField floatingLabelText="Category Name" name="category"
                value={this.state.category} onChange={this.handleChange}
              /> 
              <button type="button" className="btn btn-success"
                onClick={this.handleSaveClick}>
                Save
              </button>
              <button type="button" className="btn btn-danger"
                onClick={this.handleCancelClick}>
                Cancel
              </button>
            </div>
            :
            <div onClick={this.handleClick}>
              <FloatingActionButton secondary={true}>
                <strong className="circle">{getShortName(name)}</strong>
              </FloatingActionButton>
              <h3>{name}</h3>
            </div>
          }

          <div className="category-menu">
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

export default CategoryItem;
