import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { withRouter, matchPath } from 'react-router';

import RequireUnAuth from 'Client/hocs/require_unauth';
import RequireAuth from 'Client/hocs/require_auth';

import AppTopBar from 'Browser/components/app_top_bar';

import Login from 'Browser/routes/login';
import Card from 'Browser/routes/card';
import Browse from 'Browser/routes/browse';
import CreateCard from 'Browser/routes/create_card';
import NoMatch from 'Browser/routes/nomatch';

const LoginRoute = RequireUnAuth(Login);
const BrowseRoute = RequireAuth(Browse);
const CardRoute = RequireAuth(Card);
const CreateCardRoute = RequireAuth(CreateCard);
const NoMatchRoute = NoMatch;

class LayoutRoot extends React.Component {

  static propTypes = {
    location : PropTypes.object
  };

  constructor () {
    super();
    this.previousLocation = {
      pathname : '/'
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
    const isCardRoute = matchPath(location.pathname, {
      path : '/card/:id'
    });
    // return isModal
    return !!((location.state && location.state.modal) || isCardRoute);
  }

  renderModalRoutes (isModal, previousLocation) {
    if(isModal) {
      return (
        <Switch>
          <Route path="/card/new" component={(props) => <CreateCardRoute {...props} previousLocation={previousLocation}/>} />
          <Route path="/card/:id" component={(props) => <CardRoute {...props} previousLocation={previousLocation}/>} />
        </Switch>
      );
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
        <AppTopBar/>
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

export default withRouter(LayoutRoot);
