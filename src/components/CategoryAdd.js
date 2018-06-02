import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';

class CategoryAdd extends Component {

  constructor(props) {
    super(props);
    this.state = {
      category: '',
      errorMessage: ''
    }
  }

  handleChange = (e) => {
    var change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  }

  handleCancelAddClick = () => {
    this.props.handleCancelAddClick();
  }

  handleSaveClick = () => {
    // check that all fields were entered
    if (this.state.category === '') {
      this.setState({ errorMessage: "Please Enter A Category Name!" })
      return;
    }
    // check if the category is not already exsits
    if (this.props.categories.includes(this.state.category)) {
      this.setState({ errorMessage: "Category Already Exists!" })
    } else {
      this.setState({ errorMessage: '' })
      this.props.actionAddCategory(this.state.category);
      this.props.handleCancelAddClick();
    }
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <TextField floatingLabelText="Category Name" name="category"
            value={this.state.category} onChange={this.handleChange}
          />

          {this.state.errorMessage ?
            <div className="alert alert-danger">
              <strong>{this.state.errorMessage}</strong>
            </div>
            : <span />
          }

          <br />
          <button type="button" className="btn btn-success" 
            onClick={this.handleSaveClick}>
            Save
          </button>
          <button type="button" className="btn btn-danger" 
            onClick={this.handleCancelAddClick}>
            Cancel
          </button>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default connect(null, actions)(CategoryAdd);
