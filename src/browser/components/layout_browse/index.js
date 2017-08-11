import React from 'react';
import PropTypes from 'prop-types';
import MiniCardGrid from '../minicard_grid';

import Heart from 'Fixtures/glyphs/heart.svg';

class LayoutBrowse extends React.PureComponent {

  static propTypes = {
    loading   : PropTypes.bool,
    error     : PropTypes.object,
    card_list : PropTypes.array,
  }

  render() {
    console.log(Heart);
    return (
      <section>
        <MiniCardGrid {...this.props} />
      </section>
    );
  }
}

export default LayoutBrowse;
