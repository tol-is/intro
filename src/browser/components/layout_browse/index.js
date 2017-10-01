import React from 'react';
import PropTypes from 'prop-types';
import MiniCardGrid from '../minicard_grid';

import Add from 'Common/fixtures/glyphs/add.svg';

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
                <Add/>
      </section>
    );
  }
}

export default LayoutBrowse;
