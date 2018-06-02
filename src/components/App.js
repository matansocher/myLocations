import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Locations from './Locations';
import Categories from './Categories';
import LocationDetail from './LocationDetail';
import LocationAdd from './LocationAdd';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import ViewListIcon from 'material-ui/svg-icons/action/view-list';
import DoneIcon from 'material-ui/svg-icons/action/check-circle';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  handleToggle = () => {
    this.setState({ open: !this.state.open });
  }

  closeDrawer = (e) => {
    this.setState({ open: false });
  }

  render() {
    return (
      <Router>
        <MuiThemeProvider>    
          <div>
            <AppBar className="app-bar" title="MyLocations"
              iconClassNameRight="muidocs-icon-navigation-expand-more"
              onClick={this.handleToggle}
              style={{position: 'fixed', top: 0}} />
            <Drawer width={300} docked={false} open={this.state.open} onRequestChange={this.closeDrawer}>
              <AppBar className="app-bar" title="MyLocations" />
              <Paper>
                <Menu>
                  <Link to="/"><MenuItem onClick={this.closeDrawer} primaryText="Categories" leftIcon={<ViewListIcon />} /></ Link>
                  <Link to="/Locations"><MenuItem onClick={this.closeDrawer} primaryText="Locations" leftIcon={<DoneIcon />} /></ Link>
                </Menu>
              </Paper>
            </Drawer>
            <div className="content">
              <Switch>
                <Route path="/Locations/AddLocation" component={LocationAdd}/>
                <Route path="/Locations/:id" component={LocationDetail}/>
                <Route path="/Locations" component={Locations}/>
                <Route path="/" component={Categories}/>
              </Switch>
            </div>
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
