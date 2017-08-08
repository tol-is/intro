import React from 'react';
import PropTypes from 'prop-types';
import MiniCardGrid from '../minicard_grid';

class LayoutBrowse extends React.PureComponent {

  static propTypes = {
    loading   : PropTypes.bool,
    error     : PropTypes.object,
    card_list : PropTypes.array,
  }

  render() {
    return (
      <section>
        <MiniCardGrid {...this.props} />
      </section>
    );
  }
}

export default LayoutBrowse;
