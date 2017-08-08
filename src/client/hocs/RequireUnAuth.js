import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';

export default function(ComposedComponent) {
  class RequireUnAuth extends Component {

    static propTypes = {
      authenticated : PropTypes.bool.isRequired
    }

    render() {
      return this.props.authenticated ? (
        <Redirect to="/"/>
      ) : (
        <ComposedComponent {...this.props} />
      );
    }
  }

  function mapStateToProps(state) {
    return { authenticated : state.authenticated };
  }

  return connect(mapStateToProps)(RequireUnAuth);
}
