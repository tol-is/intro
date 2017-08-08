
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
// import { withRouter, matchPath } from 'react-router';
import { withRouter } from 'react-router';

import {
  RequireAuth,
  RequireUnAuth
} from 'hocs';

import Login from './login';
// import Dashboard from './dashboard';
// import Card from './card';
import Browse from './browse';
// import Hangar from './hangar';
// import People from './people';
// import CreateCard from './create_card';
import NoMatch from './nomatch';

// import { AddNew } from '../components';

const LoginRoute = RequireUnAuth(Login);
const BrowseRoute = RequireAuth(Browse);
const NoMatchRoute = NoMatch;

class RootSwitch extends React.Component {

  static propTypes = {
    location : PropTypes.object
  };

  constructor () {
    super();
    this.previousLocation = {
      pathname : '/dashboard'
    };
  }

  componentWillUpdate(nextProps) {
    const { location } = this.props;
    if (
      nextProps.history.action !== 'POP' &&
      (!location.state || !location.state.modal) &&
      !this.isModalRoute(location)
    ) {
      this.previousLocation = location;
    }
  }

  isModalRoute(location) {
    // // Match Card route
    // const isCardRoute = matchPath(location.pathname, {
    //   path: '/card/:id'
    // });

    // const isNewCardRoute = matchPath(location.pathname, {
    //   path: '/card/new'
    // });

    // return isModal
    // return !!(
    //   (location.state && location.state.modal)
    //   || isCardRoute || isNewCardRoute
    // );
    return false;
  }

  renderModalRoutes (isModal, previousLocation) {
    if(isModal) {
      // return (
      //   <Switch>
      //     <Route path="/card/new"  component={(props) => <CreateCardRoute {...props} previousLocation={previousLocation}/>} />
      //     <Route path="/card/:id"  component={(props) => <CardRoute {...props} previousLocation={previousLocation}/>} />
      //   </Switch>
      // );
    }
    return null;
  }

  render() {
    const { previousLocation } = this;
    const { location } = this.props;
    const isModal = this.isModalRoute(location);

    const routeLocation = isModal ? previousLocation : location;
    return (
      <main role="main">
        <Switch location={routeLocation}>
          <Route path="/login"     component={LoginRoute} />
          <Route path="/browse"    component={BrowseRoute} />
          <Route path="/"          component={BrowseRoute} />
          <Route path="*"          component={NoMatchRoute} />
        </Switch>
        {this.renderModalRoutes(isModal, previousLocation)}
      </main>
    );
  }
}

export default withRouter(RootSwitch);
