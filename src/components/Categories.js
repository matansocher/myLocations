import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import _ from 'lodash';
import CategoryItem from './CategoryItem';
import CategoryAdd from './CategoryAdd';
import { doesLocationsContainsCategory } from '../actions/CommonFunctions';
import { MuiThemeProvider } from 'material-ui/styles';
import Snackbar from 'material-ui/Snackbar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

export class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adding: false,
      gesture: false,
      gestureText: '',
    }
  }

  componentDidMount() {
    this.props.actionFetchCategories();
    this.props.actionFetchLocations(); // fetch all locations
  }

  handleRequestClose = () => {
    this.setState({ gesture: false });
  };

  fetchCategory = (category) => {
    this.props.actionSetCurrentCategory(category);
    this.navigateToRoute('Locations');
  }

  navigateToRoute = (route) => {
    this.props.history.push(route);
  }

  handleAddClick = () => {
    this.setState({ adding: true })
  }

  handleCancelAddClick = () => {
    this.setState({ adding: false })
  }

  editCategory = (oldCategory, newCategory) => {
    this.props.actionEditCategory(oldCategory, newCategory);
  }

  removeCategory = (category) => {
    // check if there are locations in that category
    if(doesLocationsContainsCategory(category)) {
      this.setState({ 
        gestureText: "There are still locations in that category", 
        gesture: true 
      });
      return;
    }
    this.props.actionRemoveCategory(category)
  }

  renderCategories() {
    const { categories } = this.props;
    if (_.isEmpty(categories)) {
      return (
        <h1>No Categories Yet</h1>
      )
    }
    return (
      categories.map((category) => {
        return (
          <CategoryItem key={category} category={category}
            fetchCategory={this.fetchCategory}
            navigateToRoute={this.navigateToRoute}
            editCategory={this.editCategory}
            removeCategory={this.removeCategory} />
        )
      })
    )
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="container">
          <div className="category">
            <h1>Categories</h1>

            {this.renderCategories()}

            {
              this.state.adding ?
                <CategoryAdd categories={this.props.categories}
                  handleCancelAddClick={this.handleCancelAddClick} />
                : <FloatingActionButton className="floatting-action-button" onClick={this.handleAddClick}>
                  <ContentAdd />
                </FloatingActionButton>
            }

            <Snackbar open={this.state.gesture} message={this.state.gestureText}
              autoHideDuration={4000} onRequestClose={this.handleRequestClose} />

          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories,
    locations: state.locations
  }
}

export default connect(mapStateToProps, actions)(Categories)
