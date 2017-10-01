import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default function(ComposedComponent) {
  class WithViewer extends Component {

    static propTypes = {
      viewer : PropTypes.shape({
        name_first : PropTypes.string,
        name_last : PropTypes.stringm
      })
    }

    render () {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps (state) {
    return { viewer : state.viewer };
  }

  return connect(mapStateToProps)(WithViewer);
}
