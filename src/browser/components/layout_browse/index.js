import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import MiniCardGrid from '../minicard_grid';
import AddIcon from 'Common/fixtures/glyphs/add.svg';

import FloatButton from 'Browser/components/button/float_button';

const FixedFloatButton = styled(FloatButton)`
  position : fixed;
  right : 30px;
  bottom : 30px;
  font-size: 100px;
  z-index : 200;
`;

const AddNewButton = () => {
  return (
    <Link
      to={{
        pathname : `/card/new`,
        state    : { modal : true }
      }}>
      <FixedFloatButton>
        <AddIcon/>
      </FixedFloatButton>
    </Link>
  );
};

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
        <AddNewButton/>
      </section>
    );
  }
}

export default LayoutBrowse;
