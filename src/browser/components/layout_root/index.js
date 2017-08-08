import React from 'react';
import PropTypes from 'prop-types';

import RootSwitch from '../app_router';

class LayoutRoot extends React.Component {
  static propTypes = {
    client : PropTypes.object,
    store  : PropTypes.object
  };

  render() {
    return (
      <div>
        <RootSwitch/>
      </div>
    );
  }
}

export default LayoutRoot;
